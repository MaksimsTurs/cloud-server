import type { Request, Response } from "express";
import type { User } from "../../index.type";
import type { CreateDirLocals, CreateDirReqBody } from "./dir.type";

import userService from "../../services/user/user.service";
import dirService from "../../services/dir/dir.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function create(
  req: Request<unknown, unknown, CreateDirReqBody>,
  res: Response<unknown, CreateDirLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to create new directory`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to create new directory!")
    });
  }

  await dirService.create(user, req.body);

  res.sendStatus(200);
};
