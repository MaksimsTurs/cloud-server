import type { Request, Response } from "express";
import type { User } from "../../index.type";
import type { UserAuthLocals } from "./user.type";

import CaughtError from "../../utils/Caught-Error.util";

import userService from "../../services/user/user.service";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function initUser(_req: Request, res: Response<unknown, UserAuthLocals>): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  if(!user) {
    throw new CaughtError({
      client: HTTP_ERRORS.NOT_FOUND("User not found!"),
      server: {
        message: `Can not find user with id ${res.locals.userId}`
      }
    });
  }

  res.status(200).send({ access: user.token });
};
