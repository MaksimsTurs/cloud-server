import type { Request, Response } from "express";
import type { UserRefreshTokenResLocals } from "./user-route.type";
import type { User } from "../../index.type";

import userService from "../../services/user/user.service";

import CaughtError from "../../utils/Caught-Error.util";

import COOKIE from "../../const/COOKIE.const";
import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function refreshToken(
  req: Request,
  res: Response<string, UserRefreshTokenResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to refresh refresh token`
      },
      client: HTTP_ERRORS.NOT_FOUND("User not found!")
    });
  }

  const refreshToken: string = userService.refreshToken(user);

  res.cookie(COOKIE.REFRESH_TOKEN_KEY, refreshToken, COOKIE.REFRESH_OPTIONS);
  res.status(200).send(refreshToken);
};
