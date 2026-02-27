import type { User } from "../../index.type";
import type { CreateDirReqBody } from "../../routes/dir/dir.type";

import path from "node:path";
import fsAsync from "fs/promises";

import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function create(user: User, body: CreateDirReqBody): Promise<void> {
  const { inWhichPath } = body;

  const rootPath: string = path.normalize(user.root_path);
  const name: string = path.normalize(body.name);
  const dirPath: string = path.resolve(rootPath, path.normalize(inWhichPath), name);

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to create new directory into a suspicious root directory ${user.root_path}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to create new directory!")
    });
  }

  if(!isPathSecure(dirPath) || !isPathHasBase(rootPath, dirPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to create new directory with suspicious full path ${dirPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to create new directory!")
    });
  }

  await fsAsync.mkdir(dirPath);
};
