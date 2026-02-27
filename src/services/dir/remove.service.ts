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
        message: `${user.id} has tried to remove items from a suspicious root directory ${rootPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not remove this items!")
    });
  }

  if(!isPathSecure(fromPath) || !isPathHasBase(rootPath, fromPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to remove items from a suspicious directory ${fromPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not remove this items!")
    });
  }

  for(let index: number = 0; index < items.length; index++) {
    const itemPath: string = path.resolve(fromPath, items[index]);

    if(!isPathSecure(itemPath) || !isPathHasBase(rootPath, itemPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to remove suspicious item ${itemPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not remove this items!")
      });
    }

    if(!fsSync.existsSync(itemPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to remove items that not exist ${itemPath}`
        },
        client: HTTP_ERRORS.CONFLICT("You can not remove item that not exist!")
      });
    }

    await fsAsync.rm(itemPath, { recursive: true });
  }
};
