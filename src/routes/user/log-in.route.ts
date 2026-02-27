import type { Request, Response } from "express";
import type { User } from "../../index.type";
import type { UserLogInReqBody, UserLogInResBody } from "./user.type";

import userService from "../../services/user/user.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import COOKIE from "../../const/COOKIE.const";

export default async function logIn(
  req: Request<unknown, unknown, UserLogInReqBody>,
  res: Response<UserLogInResBody>
): Promise<void> {
  let user: User | undefined = await userService.getBy("email", req.body.email);

  if(!user) {
   throw new CaughtError({
      server: {
        message: "Can not find user with specific email"
      },
      client: HTTP_ERRORS.NOT_FOUND("User with this email does not exist!")
    });
  }

  user = await userService.logIn(user, req.body);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, user?.token, COOKIE.OPTIONS);
  res.status(200).send({
    user: user!.id,
    tokens: {
      access: user!.token
    }
  });
};
