import type { Request, Response } from "express";
import type { UserRefreshTokenResLocals } from "./user-route.type";

import { generateRefreshToken } from "../../utils/jwt/jwt.util";

import COOKIE from "../../const/COOKIE.const";

export default async function regenerateRefreshToken(
  _req: Request,
  res: Response<string, UserRefreshTokenResLocals>
): Promise<void> {
  const newRefresh: string = generateRefreshToken({ id: res.locals.user });

  res.cookie(COOKIE.REFRESH_TOKEN_KEY, newRefresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send(newRefresh);
};
