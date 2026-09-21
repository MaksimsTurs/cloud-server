import type { Request, Response } from "express";
import type { UserResetPasswordReqBody } from "./user-route.type";

import userService from "../../services/user/user.service";

export default async function resetPassword(
  req: Request<unknown, unknown, UserResetPasswordReqBody>,
  res: Response
): Promise<void> {
  await userService.resetPassword(req.body);

  res.sendStatus(200);
};
