import type { Request, Response } from "express";
import type { UserRequestResetPasswordReqBody } from "./user-route.type";
import type { User } from "../../index.type";

import userService from "../../services/user/user.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function requestResetPassword(
  req: Request<unknown, unknown, UserRequestResetPasswordReqBody>,
  res: Response
): Promise<void> {
  const user: User | undefined = await userService.getOne({ email: req.body.email });

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to request reseting of password`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not reset the password!")
    });
  }

  await userService.sendResetPasswordEmail(user);
 
  res.sendStatus(200);
};
