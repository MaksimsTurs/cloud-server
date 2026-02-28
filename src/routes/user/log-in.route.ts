import type { Request, Response } from "express";
import type { User, UserTokens } from "../../index.type";
import type { UserLogInReqBody, UserLogInResBody } from "./user.type";

import userService from "../../services/user/user.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import COOKIE from "../../const/COOKIE.const";

export default async function logIn(
  req: Request<unknown, unknown, UserLogInReqBody>,
  res: Response<UserLogInResBody>
): Promise<void> {
  const user: User | undefined = await userService.getBy("email", req.body.email);

  if(!user) {
   throw new CaughtError({
      server: {
        message: "Can not find user with specific email"
      },
      client: HTTP_ERRORS.NOT_FOUND("User with this email does not exist!")
    });
  }

  const userData: User & UserTokens = await userService.logIn(user, req.body);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, userData.accessToken, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, userData.refreshToken, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ 
    tokens: {
      access: userData.accessToken,
      refresh: userData.refreshToken
    }
  });
};
