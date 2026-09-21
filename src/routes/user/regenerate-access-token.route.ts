import type { Request, Response } from "express";
import type { UserJwtPayload } from "../../index.type";

import CaughtError from "../../utils/Caught-Error.util";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt/jwt.util";

import COOKIE from "../../const/COOKIE.const";
import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";
import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default async function regenerateAccessToken(
  req: Request,
  res: Response<string>
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

  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME, payload);
  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.UUID_SHEME, payload.id);

  const access: string = generateAccessToken({ id: payload.id });

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, access, COOKIE.ACCESS_OPTIONS);
  res.status(200).send(access);
};
