import type { Request, Response } from "express";
import type { Dir } from "node:fs";
import type { DirItem, User } from "../../index.type";
import type { GetDirReqQueries, GetDirResBody, GetDirResLocals } from "./dir.type";

import CaughtError from "../../utils/Caught-Error.util";
import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";

import userService from "../../services/user/user.service";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import DIRITEMTYPES from "../../const/DIR-ITEM-TYPES.const";

import path from "node:path";
import fsAsync from "node:fs/promises";
import dirService from "../../services/dir/dir.service";

export default async function getDir(
  req: Request<unknown, unknown, unknown, GetDirReqQueries>, 
  res: Response<GetDirResBody, GetDirResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  let items: DirItem[] = [];

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unauthicated user try to fetch ${req.query.dirName} directory`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  items = await dirService.readDir(user, req.query.dir);

  res.status(200).send(items);
};
