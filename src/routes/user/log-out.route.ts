import type { Request, Response } from "express";
import type { User } from "../../index.type";
import type { UserLogOutResLocals } from "./user.type";

import userService from "../../services/user/user.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import COOKIE from "../../const/COOKIE.const";

export default async function logOut(
  req: Request,
  res: Response<unknown, UserLogOutResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to log out`
      },
      client: HTTP_ERRORS.FORBIDDEN("User not found!")
    });
  }

  await userService.logOut(user);

  res.clearCookie(COOKIE.ACCESS_TOKEN_KEY, COOKIE.OPTIONS);
  res.sendStatus(200);
};
