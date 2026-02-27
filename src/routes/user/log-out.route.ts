import type { Request, Response } from "express";
import type { User } from "../../index.type";
import type { UserLogOutResLocals } from "./user.type";

import userService from "../../services/user/user.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import COOKIE from "../../const/COOKIE.const";

export default async function logOut(
  _req: Request,
  res: Response<unknown, UserLogOutResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Undefined user try to create new directory`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to create new directory!")
    });
  }

  await userService.logOut(user);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, "", COOKIE.OPTIONS);
  res.sendStatus(200);
};
