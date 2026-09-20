import type { Request, Response } from "express";
import type { UserConfirmQuery } from "./user-route.type";

import userService from "../../services/user/user.service";

import app from "../../Application";

export default async function confirmEmail(
  req: Request<unknown, unknown, unknown, UserConfirmQuery>, 
  res: Response
): Promise<void> {
  const { conf } = app.context;
  await userService.confirmEmail(req.query.token);

  res.redirect(301, conf.ALLOWED_ORIGINS);
};
