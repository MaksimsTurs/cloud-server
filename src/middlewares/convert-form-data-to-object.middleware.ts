import type { Request, Response, NextFunction } from "express";

import { formMultipartEncode } from "@maksims/form-multipart-encoder.js";

export default function convertFormDataToObject(req: Request, _res: Response, next: NextFunction): void {
  req.body = formMultipartEncode(req.body);
  next();
};
