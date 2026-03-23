import type { Request } from "express";

import CaughtError from "../utils/Caught-Error.util";

import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";

export default function defaultRoute(req: Request): void {
  throw new CaughtError(
    HTTP_ERROR_CODES.NOT_FOUND,
    `Remote user ${req.socket.remoteAddress} has requested unknown route path ${req.path}`,
    "Path not found!"
  );
};
