import type { NextFunction, Request, Response } from "express";

type ValidationTarget = "body" | "params" | "query" | "cookies";

import VALIDATION_SCHEMES from "../const/VALIDATION_SCHEMES.const";

export default function validate(what: ValidationTarget, schema: any) {
  return async function(req: Request, _res: Response, next: NextFunction): Promise<void> {
    await VALIDATION_SCHEMES.validate(schema, req[what]);
    next();
  }
};
