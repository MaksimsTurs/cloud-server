import type { NextFunction, Request, Response } from "express";
import type { User, UserJwtPayload } from "../index.type";
import type { JwtTokenPaylaod } from "../utils/jwt/jwt.type";

import CaughtError from "../utils/Caught-Error.util";
import { verifyAccessToken } from "../utils/jwt/jwt.util";

import COOKIE from "../const/COOKIE.const";
import VALIDATION_SCHEMES from "../const/VALIDATION_SCHEMES.const";
import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";

import userService from "../services/user/user.service";

export default async function isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token: string | undefined = req.cookies[COOKIE.ACCESS_TOKEN_KEY];
  
  if(!token) {
    throw new CaughtError(
      HTTP_ERROR_CODES.UNAUTHORIZED,
      undefined,
      "You are not Authorized!"
    );
  }

  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyAccessToken<UserJwtPayload>(token);

  if(!payload) {
    throw new CaughtError(
      HTTP_ERROR_CODES.UNAUTHORIZED,
      undefined,
      "You are not Authorized!"
    );
  }

  VALIDATION_SCHEMES.JWT_PAYLOAD.validate(payload);

  // Unauthenticated, unauthorized and unverified users does not have access to API.
  const user: User | undefined = await userService.getById(payload.id);

  if(!user) {
    throw new CaughtError(
      HTTP_ERROR_CODES.FORBIDDEN,
      `Unknown user ${req.socket.remoteAddress} has tried to access ${req.path} path`,
      "You have no access to this functionality!"
    );
  }

  res.locals.user = user;
  next();
};
