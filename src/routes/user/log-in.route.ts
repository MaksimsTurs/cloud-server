import type { Request, Response } from "express";
import type { UserLogInReqBody, UserLogInResBody } from "./user-route.type";
import type { UserServiceVerifyReturn } from "../../services/user/user-service.type";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function logIn(
  req: Request<unknown, unknown, UserLogInReqBody>,
  res: Response<UserLogInResBody>
): Promise<void> {
  const { tokens }: UserServiceVerifyReturn = await userService.verify(req.body);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, tokens.access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, tokens.refresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ tokens });
};
