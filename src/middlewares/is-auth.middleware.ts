import type { NextFunction, Request, Response } from "express";
import type { User } from "../index.type";

import CaughtError from "../utils/Caught-Error.util";

import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";

import userService from "../services/user/user.service";

export default async function isAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId: string = await userService.hasAccess(req.cookies);
  const user: User | undefined = await userService.getById(userId);

  if(!user) {
    throw new CaughtError(
      HTTP_ERROR_CODES.FORBIDDEN,
      `Unknown user${req.socket.remoteAddress} has tried to access route ${req.path}`,
      "You are not Authenticated!"
    );
  }

  res.locals.user = user;
  next();
};
