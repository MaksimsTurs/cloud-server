import type { Request, Response } from "express";

import { generateRefreshToken } from "../../utils/jwt/jwt.util";

import COOKIE from "../../const/COOKIE.const";

export default async function init(
  req: Request, 
  res: Response
): Promise<void> {
  const access: string = req.cookies[COOKIE.ACCESS_TOKEN_KEY];
  const refresh: string = generateRefreshToken({ id: res.locals.user.id });

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, refresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({
    tokens: {
      access,
      refresh
    },
    user: {
      is_verified: res.locals.user.is_verified
    }
  });
};
