import type { NextFunction, Request, Response } from "express";
import type { User, UserJwtPayload } from "../index.type";
import type { JwtTokenPaylaod } from "../utils/jwt/jwt.type";

import CaughtError from "../utils/Caught-Error.util";
import { verifyAccessToken } from "../utils/jwt/jwt.util";

import COOKIE from "../const/COOKIE.const";
import HTTP_ERRORS from "../const/HTTP-ERRORS.const";
import VALIDATION_SCHEMES from "../const/VALIDATION-SCHEMES.const";

import userService from "../services/user/user.service";

export default async function isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token: string | undefined = req.cookies[COOKIE.ACCESS_TOKEN_KEY];
  
  if(!token) {
    throw new CaughtError({ client: HTTP_ERRORS.UNAUTHORIZED() });
  }

  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyAccessToken<UserJwtPayload>(token);

  if(!payload) {
    throw new CaughtError({ client: HTTP_ERRORS.UNAUTHORIZED() });
  }

  VALIDATION_SCHEMES.JWT_PAYLOAD.validate(payload);

  // Unauthenticated, unauthorized and unverified users does not have access to 
  // API.
  const user: User | undefined = await userService.getById(payload.id);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to acsess ${req.path} path`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no access to this functionality!")
    });
  }

  res.locals.user = user;
  next();
};
