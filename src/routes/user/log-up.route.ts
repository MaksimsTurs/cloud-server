import type { Request, Response } from "express";
import type { UserLogUpResBody, UserLogUpReqBody } from "./user-route.type";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function logUp(
  req: Request<unknown, unknown, UserLogUpReqBody>, 
  res: Response<UserLogUpResBody>
): Promise<void> {
  const { tokens, user, root } = await userService.logUp(req.body);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, tokens.access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, tokens.refresh, COOKIE.REFRESH_OPTIONS);
  res
    .status(200)
    .send({ 
      tokens: tokens,
      user: {
        is_verified: user.is_verified,
        root_id: root.id
      }
    });
};
