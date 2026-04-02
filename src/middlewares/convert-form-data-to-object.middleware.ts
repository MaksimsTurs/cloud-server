import type { Request, Response, NextFunction } from "express";

import fromFlatFormDataObjectToJSObject from "../utils/to.util";

export default function convertFormDataToObject(req: Request, _res: Response, next: NextFunction): void {
  req.body = fromFlatFormDataObjectToJSObject(req.body);
  next();
};
