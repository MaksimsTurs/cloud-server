import type { Request, Response, NextFunction } from "express";

import CaughtError from "../utils/Caught-Error.util";

import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";

export default async function isNotVerified(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { user } = res.locals;

  if(user.is_verified) {
    throw new CaughtError(
      HTTP_ERROR_CODES.FORBIDDEN,
      `Verified user ${user.id} has tried to access ${req.path} path`,
      "You are verified!"
    );
  }

  next();
};
