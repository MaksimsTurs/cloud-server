import type { Dir } from "node:fs";
import type { DirItem, User } from "../../index.type";

import CaughtError from "../../utils/Caught-Error.util";
import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import DIRITEMTYPES from "../../const/DIR-ITEM-TYPES.const";

import path from "node:path";
import fsAsync from "node:fs/promises";

export default async function readDir(user: User, dirPath: string): Promise<DirItem[]> {
  const items: DirItem[] = [];

  let fullPath: string = "";

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unauthicated user try to fetch ${dirPath} directory`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  if(!isPathSecure(user.root_path)) {
    throw new CaughtError({
      server: {
        message: `${user.id} have unsecure root path ${user.root_path}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  if(!isPathSecure(dirPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to open unsecure directory ${dirPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  fullPath = path.resolve(path.normalize(user.root_path), path.normalize(dirPath));

  if(!isPathSecure(fullPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to access unsecure directory ${fullPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  if(!isPathHasBase(user.root_path, fullPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to access directory without base path ${user.root_path} - ${fullPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  const dirents: Dir = await fsAsync.opendir(fullPath);
    
  for await(let dirent of dirents) {
    const direntPath: string = `${dirent.parentPath}/${dirent.name}`;

    if(dirent.isDirectory()) {
      items.push({
        name: dirent.name,
        path: direntPath,
        type: DIRITEMTYPES.DIR
      });
    } else if(dirent.isFile()) {
      const itemStat = await fsAsync.lstat(direntPath);
      
      items.push({
        name: dirent.name,
        path: direntPath,
        type: DIRITEMTYPES.FILE,
        extention: path.extname(dirent.name),
        size: itemStat.size
      })
    }
  }

  return items;
};
