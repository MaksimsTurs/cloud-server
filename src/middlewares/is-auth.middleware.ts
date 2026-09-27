import type { NextFunction, Request, Response } from "express";
import type { User } from "../index.type";
import type { JwtTokenPaylaod } from "../utils/jwt/jwt.type";
import type { UserJwtPayload } from "../index.type";

import { HTTP401Error } from "../utils/HTTP-Error.util";
import { verifyAccessToken } from "../utils/jwt/jwt.util";

import userService from "../services/user/user.service";

import COOKIE from "../const/COOKIE.const";
import VALIDATION_SCHEMES from "../const/VALIDATION_SCHEMES.const";

// TODO: Maybe do not request user from database.
export default async function isAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId: string = await verifyAuthToken(req);
  const user: User | undefined = await userService.getById(userId);
  
  if(!user) {
    throw new HTTP401Error(
      `Unknown user ${req.socket.remoteAddress} has tried to access route ${req.path}`,
      "You are unauthorized!"
    );
  }

  res.locals.user = user;
  next();
};

// TODO: In the future add more auth options (API_KEY).
async function verifyAuthToken(req: Request): Promise<string> {
  const accessToken: string | undefined = req.cookies[COOKIE.ACCESS_TOKEN_KEY];
  
  if(!accessToken) {
    throw new HTTP401Error(
      `Unknown user ${req.socket.remoteAddress} has tried to access route ${req.path}`,
      "You are unauthorized!"
    );
  }

  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyAccessToken<UserJwtPayload>(accessToken);

  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME, payload);
  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.UUID_SHEME, payload?.id);

  return payload!.id;
};
