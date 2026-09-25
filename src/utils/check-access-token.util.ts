import type { Request } from "express";
import type { JwtTokenPaylaod } from "./jwt/jwt.type";
import type { UserJwtPayload } from "../index.type";

import COOKIE from "../const/COOKIE.const";
import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";
import VALIDATION_SCHEMES from "../const/VALIDATION_SCHEMES.const";

import { verifyAccessToken } from "./jwt/jwt.util";
import CaughtError from "./Caught-Error.util";

// TODO: In the future add more auth options (API_KEY).
export default async function checkAccessToken(req: Request): Promise<string> {
  const accessToken: string | undefined = req.cookies[COOKIE.ACCESS_TOKEN_KEY];

  if(!accessToken) {
    throw new CaughtError(
      HTTP_ERROR_CODES.UNAUTHORIZED,
      undefined,
      "You are not Authenticated!"
    );
  }

  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyAccessToken<UserJwtPayload>(accessToken);

  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME, payload);
  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.UUID_SHEME, payload?.id);

  return payload!.id;
};
