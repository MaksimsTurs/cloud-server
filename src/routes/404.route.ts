import type { Request } from "express";

import { HTTP404Error } from "../utils/HTTP-Error.util";

export default function defaultRoute(req: Request): void {
  throw new HTTP404Error(`Unknown user ${req.socket.remoteAddress} has requested unknown path ${req.path}`);
};
