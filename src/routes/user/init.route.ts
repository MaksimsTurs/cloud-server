import type { Request, Response } from "express";
import type { UserTokens } from "../../index.type";
import type { InitUserResBody } from "./user-route.type";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function init(
  req: Request, 
  res: Response<InitUserResBody>
): Promise<void> {
  const tokens: UserTokens = await userService.init(req.cookies);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, tokens.access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, tokens.refresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ tokens });
};
