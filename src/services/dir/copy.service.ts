import type { User } from "../../index.type";
import type { CopyDirReqBody } from "../../routes/dir/dir.type";

import path from "node:path/posix";
import fsSync from "fs";
import fsAsync from "fs/promises";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function copy(user: User, body: CopyDirReqBody): Promise<void> {
  const { itemNames } = body;
  const rootPath: string = path.normalize(user.root_path);
  const fromPath: string = path.resolve(rootPath, path.normalize(body.fromPath));
  const intoPath: string = path.resolve(rootPath, path.normalize(body.intoPath));

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

  for(let index: number = 0; index < itemNames.length; index++) {
    const itemName: string = itemNames[index];
    const itemSrcPath: string = path.resolve(fromPath, path.normalize(itemName));
    const itemDestPath: string = path.resolve(intoPath, path.normalize(itemName));
    
    if(!isPathSecure(itemSrcPath) || !isPathHasBase(rootPath, itemSrcPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy ${itemName} from ${itemSrcPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
      });
    }

    if(!isPathSecure(itemDestPath) || !isPathHasBase(rootPath, itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy ${itemName} into ${itemDestPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not copy this items!")
      });
    }

    if(fsSync.existsSync(itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy item that alredy exist ${itemDestPath}`
        },
        client: HTTP_ERRORS.CONFLICT("Item with the same name alredy exist!")
      });
    }

    await fsAsync.cp(itemSrcPath, itemDestPath);
  }
};
