import type { Request, Response } from "express";
import type { UserResetPasswordBody } from "./user-route.type";

import userService from "../../services/user/user.service";

export default async function resetPassword(
  req: Request<unknown, unknown, UserResetPasswordBody>,
  res: Response
): Promise<void> {
  await userService.resetPassword(req.body);

  res.sendStatus(200);
};
