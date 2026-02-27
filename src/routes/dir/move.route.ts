import type { Request, Response } from "express";
import type { MoveDirReqBody, MoveDirResLocals } from "./dir.type";
import type { User } from "../../index.type";

import userService from "../../services/user/user.service";
import dirService from "../../services/dir/dir.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function move(
  req: Request<unknown, unknown, MoveDirReqBody>, 
  res: Response<unknown, MoveDirResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to move directory items`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to move items!")
    });
  }

  await dirService.move(user, req.body);

  res.sendStatus(200);
};
