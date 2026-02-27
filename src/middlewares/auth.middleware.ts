import type { NextFunction, Request, Response } from "express";
import type { JwtAuthPayload} from "../index.type";
import type { JwtTokenPaylaod } from "../utils/jwt/jwt.type";

import CaughtError from "../utils/Caught-Error.util";
import { verifyAccessToken } from "../utils/jwt/jwt.util";

import COOKIE from "../const/COOKIE.const";
import HTTP_ERRORS from "../const/HTTP-ERRORS.const";
import VALIDATION_SCHEMES from "../const/VALIDATION-SCHEMES.const";

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token: string | undefined = req.cookies[COOKIE.ACCESS_TOKEN_KEY];
  const payload: JwtTokenPaylaod<JwtAuthPayload> | undefined = verifyAccessToken<JwtAuthPayload>(token);
  
  if(!payload) {
    throw new CaughtError({ client: HTTP_ERRORS.UNAUTHORIZED() });
  }

  VALIDATION_SCHEMES.JWT_PAYLOAD.validate(payload);
  res.locals.userId = payload.id;

  next();
};
