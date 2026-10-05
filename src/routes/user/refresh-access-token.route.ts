import type { Request, Response } from "express";
import type { UserJwtPayload } from "../../index.type";

import { HTTP401Error } from "../../utils/HTTP-Error.util";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt/jwt.util";

import COOKIE from "../../const/COOKIE.const";
import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default async function refreshAccessToken(
  req: Request,
  res: Response<string>
): Promise<void> {
  const refreshToken: string | undefined = req.cookies[COOKIE.REFRESH_TOKEN_KEY];
  const payload: UserJwtPayload | undefined = verifyRefreshToken(refreshToken);
  
  if(!payload || !payload?.id) {
    throw new HTTP401Error(
      `User with suspicious id ${payload?.id} has tried to generate new access token`,
      "You are unauthorized!"
    );
  }

  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.COMMON.JWT_PAYLOAD, payload);
  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.COMMON.UUID, payload.id);

  const access: string = generateAccessToken({ id: payload.id });

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, access, COOKIE.ACCESS_OPTIONS);
  res.status(200).send(access);
};
