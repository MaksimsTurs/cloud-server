import type { User } from "../../index.type";
import type { MoveDirReqBody } from "../../routes/dir/dir.type";

import path from "node:path";
import fsAsync from "node:fs/promises";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function move(user: User, body: MoveDirReqBody): Promise<void> {
  const { itemNames } = body;

  const rootPath: string = path.normalize(user.root_path);
  const fromPath: string = path.resolve(rootPath, path.normalize(body.fromPath));
  const intoPath: string = path.resolve(rootPath, path.normalize(body.intoPath));

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to move items into a suspicious root directory ${rootPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not move this items!")
    });
  }

  if(!isPathSecure(fromPath) || !isPathHasBase(rootPath, fromPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to move items from a suspicious directory ${fromPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not move this items!")
    });
  }

  if(!isPathSecure(intoPath) || !isPathHasBase(rootPath, intoPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to move items into a suspicious directory ${intoPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not move this items!")
    });
  }

  for(let index: number = 0; index < itemNames.length; index++) {
    const itemName: string = itemNames[index];
    const itemSrcPath: string = path.resolve(fromPath, path.normalize(itemName));
    const itemDestPath: string = path.resolve(intoPath, path.normalize(itemName));
    
    if(!isPathSecure(itemSrcPath) || !isPathHasBase(rootPath, itemSrcPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to move item from suspicious src path ${itemSrcPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not move this items!")
      });
    }

    if(!isPathSecure(itemDestPath) || !isPathHasBase(rootPath, itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to move item into suspicious dest path ${itemDestPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not move this items!")
      });
    }

    await fsAsync.rename(itemSrcPath, itemDestPath);
  }
};
