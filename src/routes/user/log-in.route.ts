import type { Request, Response } from "express";
import type { UserLogInReqBody, UserLogInResBody } from "./user-route.type";
import type { User } from "../../index.type";

import argon from "argon2";

import CaughtError from "../../utils/Caught-Error.util";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/jwt.util";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";
import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function logIn(
  req: Request<unknown, unknown, UserLogInReqBody>,
  res: Response<UserLogInResBody>
): Promise<void> {
  const user: User | undefined = await userService.getOne({ email: req.body.email });
  
  if(!user) {
   throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to log in with unknown email`
      },
      client: HTTP_ERRORS.NOT_FOUND("User with this email does not exist!")
    });
  }

  const match: boolean = await argon.verify(user.password, req.body.password);
  
  if(!match) {
    throw new CaughtError({
      server: {
        message: `${user.id} has does not passed a password verification`
      },
      client: HTTP_ERRORS.BAD_REQUEST("Password is not correct!")
    });
  }

  const access: string = generateAccessToken({ id: user.id });
  const refresh: string = generateRefreshToken({ id: user.id });

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, refresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ 
    tokens: { 
      access, 
      refresh 
    },
    user: {
      is_verified: user.is_verified
    }
  });
};
