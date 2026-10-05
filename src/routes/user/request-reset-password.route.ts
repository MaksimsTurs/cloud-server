import type { Request, Response } from "express";
import type { UserRequestResetPasswordReqBody } from "./user-route.type";
import type { User } from "../../index.type";

import userService from "../../services/user/user.service";

import { HTTP400Error } from "../../utils/HTTP-Error.util";

export default async function requestResetPassword(
  req: Request<unknown, unknown, UserRequestResetPasswordReqBody>,
  res: Response
): Promise<void> {
  const user: User | undefined = await userService.getOne({ pseudonym: req.body.pseudonym });

  if(!user) {
    throw new HTTP400Error(
      `Unknown user ${req.socket.remoteAddress} has tried to request password reseting`,
      "User does not exist!"
    );
  }

  await userService.sendResetPasswordEmail(req.body.email, user);
 
  res.sendStatus(200);
};
