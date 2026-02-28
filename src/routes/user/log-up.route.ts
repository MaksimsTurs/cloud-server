import type { Request, Response } from "express";
import type { UserLogUpReqBody, UserLogUpResBody } from "./user.type";
import type { User, UserTokens } from "../../index.type";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function logup(req: Request<unknown, unknown, UserLogUpReqBody>, res: Response<UserLogUpResBody, any>): Promise<void> {
  const user: User & UserTokens = await userService.logUp(req.body);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, user.accessToken, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, user.refreshToken, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ tokens: { access: user.accessToken, refresh: user.refreshToken }});
};
