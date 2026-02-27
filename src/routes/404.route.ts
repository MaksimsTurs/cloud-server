import type { Request } from "express";

import HTTP_ERRORS from "../const/HTTP-ERRORS.const";

import CaughtError from "../utils/Caught-Error.util";

export default function defaultRoute(req: Request): void {
  throw new CaughtError({
    server: {
      message: `Remote user ${req.socket.remoteAddress} has requested unknown route path ${req.path}`
    },
    client: HTTP_ERRORS.NOT_FOUND("Path not found!")
  });
};
