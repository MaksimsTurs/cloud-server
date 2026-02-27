import type { Dir, Stats } from "node:fs";
import type { DirItem, User } from "../../index.type";

import CaughtError from "../../utils/Caught-Error.util";
import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import DIR_ITEM_TYPES from "../../const/DIR-ITEM-TYPES.const";

import path from "node:path";
import fsAsync from "node:fs/promises";

export default async function read(user: User, dirPath: string): Promise<DirItem[]> {
  const items: DirItem[] = [];
  const fullPath: string = path.resolve(path.normalize(user.root_path), path.normalize(dirPath));

  if(!isPathSecure(user.root_path)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to read items from a suspicious root directory ${user.root_path}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not read this directory!")
    });
  }

  if(!isPathSecure(dirPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to read items from a suspicious directory ${dirPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not read this directory!")
    });
  }

  if(!isPathSecure(fullPath) || !isPathHasBase(user.root_path, fullPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to read items from a suspicious directory ${fullPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not read this directory!")
    });
  }

  const dirents: Dir = await fsAsync.opendir(fullPath);
    
  for await(let dirent of dirents) {
    const direntPath: string = (`${dirPath}/${dirent.name}`);

    if(dirent.isDirectory()) {
      items.push({
        name: dirent.name,
        path: direntPath,
        type: DIR_ITEM_TYPES.DIR
      });
    } else if(dirent.isFile()) {
      const itemStat: Stats = await fsAsync.lstat(direntPath);
      
      items.push({
        name: dirent.name,
        path: direntPath,
        type: DIR_ITEM_TYPES.FILE,
        extention: path.extname(dirent.name),
        size: itemStat.size
      })
    }
  }

  return items;
};
