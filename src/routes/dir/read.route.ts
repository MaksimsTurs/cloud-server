import type { Request, Response } from "express";
import type { DirItem, User } from "../../index.type";
import type { ReadDirReqQueries, ReadDirResBody, ReadDirResLocals } from "./dir.type";

import CaughtError from "../../utils/Caught-Error.util";

import userService from "../../services/user/user.service";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import dirService from "../../services/dir/dir.service";

export default async function read(
  req: Request<unknown, unknown, unknown, ReadDirReqQueries>, 
  res: Response<ReadDirResBody, ReadDirResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  let items: DirItem[] = [];

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Undefined user try to fetch ${req.query.dir} directory`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  items = await dirService.read(user, req.query.dir);

  res.status(200).send(items);
};
