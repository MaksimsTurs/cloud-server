import type { User } from "../../index.type";
import type { MoveDirReqBody } from "../../routes/dir/dir.type";

import path from "node:path/posix";
import fsAsync from "node:fs/promises";
import fsSync from "node:fs";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function move(user: User, body: MoveDirReqBody): Promise<void> {
  const { from, into, items } = body;

  const rootPath: string = path.normalize(user.root_path);
  const fromPath: string = path.resolve(rootPath, path.normalize(from));
  const intoPath: string = path.resolve(rootPath, path.normalize(into));

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} have unsecure root path ${rootPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not move items into this directory!")
    });
  }

  if(!isPathSecure(fromPath) || !isPathHasBase(rootPath, fromPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying copy items from unsecure path ${fromPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not move items from this directory!")
    });
  }

  if(!isPathSecure(intoPath) || !isPathHasBase(rootPath, intoPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying move items into unsecure path ${intoPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not move items into this directory!")
    });
  }

  for(let index: number = 0; index < items.length; index++) {
    const itemSrcPath: string = path.resolve(fromPath, path.normalize(items[index]));
    const itemDestPath: string = path.resolve(intoPath, path.normalize(items[index]));
    
    if(!isPathSecure(itemSrcPath) || !isPathHasBase(rootPath, itemSrcPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} trying move from ${itemSrcPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not move items into this directory!")
      });
    }

    if(!isPathSecure(itemDestPath) || !isPathHasBase(rootPath, itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} trying move into unsecure path ${itemDestPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not move items into this directory!")
      });
    }

    if(fsSync.existsSync(itemDestPath)) {
      throw new CaughtError({
        server: {
          message: `Item with name ${itemDestPath} alredy exist`
        },
        client: HTTP_ERRORS.CONFLICT("Item in this directory with the same name alredy exist!")
      });
    }

    await fsAsync.rename(itemSrcPath, itemDestPath);
  }
};
