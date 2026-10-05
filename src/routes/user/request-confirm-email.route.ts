import type { Request, Response } from "express";
import type { UserRequestConfirmEmailReqBody, UserResponseConfirmEmailLocals } from "./user-route.type.ts";

import userService from "../../services/user/user.service";

export default async function requestConfirmEmail(
  req: Request<unknown, unknown, UserRequestConfirmEmailReqBody>, 
  res: Response<unknown, UserResponseConfirmEmailLocals>
): Promise<void> {
  await userService.sendConfirmEmail(req.body.email, res.locals.user);

  res.sendStatus(200);
};
