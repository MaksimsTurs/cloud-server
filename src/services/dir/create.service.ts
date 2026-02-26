import { User } from "../../index.type";

import path from "node:path/posix";
import fsSync from "node:fs";
import fsAsync from "node:fs/promises";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function create(user: User, body): Promise<void> {
  const { name, whichPath } = body;

  const rootPath: string = path.normalize(user.root_path);
  const normalizedName: string = path.normalize(name);
  const fullPath: string = path.resolve(rootPath, path.normalize(whichPath), normalizedName);

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} have unsecure root path ${user.root_path}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not create new directory!")
    });
  }

  if(!isPathSecure(fullPath) || !isPathHasBase(rootPath, fullPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to create new item ${fullPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not create new directory!")
    });
  }

  if(fsSync.existsSync(fullPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to create item with busy name`
      },
      client: HTTP_ERRORS.CONFLICT("Directory with the same name alredy exist!")
    });
  }

  await fsAsync.mkdir(fullPath);
};
