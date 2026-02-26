import type { Request, Response } from "express";
import type { CopyDirReqBody, CopyDirResLocals } from "./dir.type";
import type { User } from "../../index.type";

import userService from "../../services/user/user.service";
import dirService from "../../services/dir/dir.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function copy(
  req: Request<unknown, unknown, CopyDirReqBody>, 
  res: Response<unknown, CopyDirResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Undefined user try to copy directory items`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this directory!")
    });
  }

  await dirService.copy(user, req.body);

  res.sendStatus(200);
};
