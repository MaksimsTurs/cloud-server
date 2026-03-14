import type { Request, Response, NextFunction } from "express";

import CaughtError from "../utils/Caught-Error.util";

import HTTP_ERRORS from "../const/HTTP-ERRORS.const";

export default async function isVerified(req: Request, res: Response, next: NextFunction): Promose<void> {
  const { user } = res.locals;

  if(!user.is_verified) {
    throw new CaughtError({
      server: {
        message: `Unverified user ${user.id} has tried to access ${req.path} path`
      },
      client: HTTP_ERRORS.FORBIDDEN("You are not verified!")
    });
  }

  next();
};
