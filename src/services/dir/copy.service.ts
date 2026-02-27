import type { User } from "../../index.type";
import type { CopyDirReqBody } from "../../routes/dir/dir.type";

import path from "node:path/posix";
import fsAsync from "node:fs/promises";
import fsSync from "node:fs";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function copy(user: User, body: CopyDirReqBody): Promise<void> {
  const { from, into, items } = body;

  const rootPath: string = path.normalize(user.root_path);
  const fromPath: string = path.resolve(rootPath, path.normalize(from));
  const intoPath: string = path.resolve(rootPath, path.normalize(into));

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to copy items from a suspicious root directory ${rootPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
    });
  }

  if(!isPathSecure(fromPath) || !isPathHasBase(rootPath, fromPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to copy items from a suspicious directory ${fromPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
    });
  }

  if(!isPathSecure(intoPath) || !isPathHasBase(rootPath, intoPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to copy items into suspicious directory ${intoPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
    });
  }

  for(let index: number = 0; index < items.length; index++) {
    const itemSrcPath: string = path.resolve(fromPath, path.normalize(items[index]));
    const itemDestPath: string = path.resolve(intoPath, path.normalize(items[index]));
    
    if(!isPathSecure(itemSrcPath) || !isPathHasBase(rootPath, itemSrcPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy ${items[index]} from ${itemSrcPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
      });
    }

    if(!isPathSecure(itemDestPath) || !isPathHasBase(rootPath, itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy ${items[index]} into ${itemDestPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
      });
    }

    if(fsSync.existsSync(itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy item that alredy exist ${itemSrcPath} -> ${itemDestPath}`
        },
        client: HTTP_ERRORS.CONFLICT("Item alredy exist in this directory!")
      });
    }

    await fsAsync.cp(itemSrcPath, itemDestPath);
  }
};
