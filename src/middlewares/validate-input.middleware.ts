import type { VineValidator } from "@vinejs/vine";
import type { NextFunction, Request, Response } from "express";

type ValidationTarget = "body" | "params" | "query" | "cookies";

export default function validate(what: ValidationTarget, schema: VineValidator<any, any>) {
  return async function(req: Request, _res: Response, next: NextFunction) {
    try {
      await schema.validate(req[what]);
      next();
    } catch(error) {
      next(error);
    }
  }
};
