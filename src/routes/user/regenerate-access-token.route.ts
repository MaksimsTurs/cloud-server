import type { Request, Response } from "express";
import type { UserRefreshTokenResLocals } from "./user-route.type";
import type { UserJwtPayload } from "../../index.type";

import CaughtError from "../../utils/Caught-Error.util";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt/jwt.util";

import COOKIE from "../../const/COOKIE.const";
import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";
import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default async function regenerateAccessToken(
  req: Request,
  res: Response<string, UserRefreshTokenResLocals>
): Promise<void> {
  const refreshToken: string | undefined = req.cookies[COOKIE.REFRESH_TOKEN_KEY];
  const payload: UserJwtPayload | undefined = verifyRefreshToken(refreshToken);
  
  if(!payload || !payload?.id) {
    throw new CaughtError(
      HTTP_ERROR_CODES.UNAUTHORIZED,
      `User with suspicious id(${payload?.id}) has tried to generate new access token.`,
      "You are unauthorized!"
    );
  }

  VALIDATION_SCHEMES.create(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME).validate(payload);
  VALIDATION_SCHEMES.create(VALIDATION_SCHEMES.UUID_SHEME).validate(payload.id);

  const access: string = generateAccessToken({ id: res.locals.user });

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, access, COOKIE.ACCESS_OPTIONS);
  res.status(200).send(access);
};
