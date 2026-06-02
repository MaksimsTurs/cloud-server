import type { Request, Response } from "express";

import COOKIE from "../../const/COOKIE.const";

import userService from "../../services/user/user.service";

export default async function init(
  req: Request, 
  res: Response
): Promise<void> {
  const { accessToken, refreshToken, is_verified } = await userService.init(req.cookies[COOKIE.REFRESH_TOKEN_KEY]);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, accessToken, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, refreshToken, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({
    tokens: {
      access: accessToken,
      refresh: refreshToken
    },
    user: {
      is_verified
    }
  });
};
