import type { Request, Response } from "express";
import type { UserConfirmQuery } from "./user-route.type";

import userService from "../../services/user/user.service";

export default async function confirm(
  req: Request<unknown, unknown, unknown, UserConfirmQuery>, 
  res: Response
): Promise<void> {
  await userService.confirmEmail(req.query.token);

  res.redirect(301, "http://localhost:3000/");
};
