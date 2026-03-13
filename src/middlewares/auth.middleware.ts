import type { NextFunction, Request, Response } from "express";
import type { User, UserJwtPayload } from "../index.type";
import type { JwtTokenPaylaod } from "../utils/jwt/jwt.type";

import CaughtError from "../utils/Caught-Error.util";
import { verifyAccessToken } from "../utils/jwt/jwt.util";

import COOKIE from "../const/COOKIE.const";
import HTTP_ERRORS from "../const/HTTP-ERRORS.const";
import VALIDATION_SCHEMES from "../const/VALIDATION-SCHEMES.const";

import userService from "../services/user/user.service";

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token: string | undefined = req.cookies[COOKIE.ACCESS_TOKEN_KEY];
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyAccessToken<UserJwtPayload>(token);
  
  if(!payload) {
    throw new CaughtError({ client: HTTP_ERRORS.UNAUTHORIZED() });
  }

  const user: User | undefined = await userService.getById(payload.id);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to get ${req.query.dir} directory items`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to read this directory!")
    });
  }

  if(!user.is_verified) {
    throw new CaughtError({
      server: {
        message: `not verified user ${user.id} has tried to access ${req.path} route`
      },
      client: HTTP_ERRORS.FORBIDDEN("You should confirm you password first!")
    });
  }

  VALIDATION_SCHEMES.JWT_PAYLOAD.validate(payload);
  res.locals.userId = payload.id;

  next();
};
