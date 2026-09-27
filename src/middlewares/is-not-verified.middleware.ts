import type { Request, Response, NextFunction } from "express";

import { HTTP403Error } from "../utils/HTTP-Error.util";

export default async function isNotVerified(
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  const { user } = res.locals;

  if(user.is_verified) {
    throw new HTTP403Error(`Verified user ${user.id} has tried to access path ${req.path}`);
  }

  next();
};
