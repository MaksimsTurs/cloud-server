import type { Request, Response } from "express";
import type { UserLogInReqBody, UserLogInResBody } from "./user-route.type";
import type { User, UserTokens } from "../../index.type";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function logIn(
  req: Request<unknown, unknown, UserLogInReqBody>,
  res: Response<UserLogInResBody>
): Promise<void> {
  const user: User = await userService.verifyPassowrd(req.body);
  const tokens: UserTokens = userService.generateTokens(user.id);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, tokens.access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, tokens.refresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ tokens });
};
