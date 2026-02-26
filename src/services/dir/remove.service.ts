import type { User } from "../../index.type";
import type { RemoveDirReqBody } from "../../routes/dir/dir.type";

import path from "node:path/posix";
import fsAsync from "node:fs/promises";
import fsSync from "node:fs";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function remove(user: User, body: RemoveDirReqBody): Promise<void> {
  const { from, items } = body;

  const rootPath: string = path.normalize(user.root_path);
  const fromPath: string = path.resolve(rootPath, path.normalize(from));

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} have unsecure root path ${rootPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not remove items from this directory!")
    });
  }

  if(!isPathSecure(fromPath) || !isPathHasBase(rootPath, fromPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to remove items from unsecure directory ${fromPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not remove items from this directory!")
    });
  }

  for(let index: number = 0; index < items.length; index++) {
    const itemPath: string = path.resolve(fromPath, items[index]);

    if(!isPathSecure(itemPath) || !isPathHasBase(rootPath, itemPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} trying remove unsecure path ${itemPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not remove items!")
      });
    }

    if(!fsSync.existsSync(itemPath)) {
      throw new CaughtError({
        server: {
          message: `Can not remove not existing item ${itemPath}`
        },
        client: HTTP_ERRORS.CONFLICT("Can not remove not existing item!")
      });
    }


    await fsAsync.rm(itemPath, { recursive: true });
  }
};
