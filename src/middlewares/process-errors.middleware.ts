import type { Response, Request } from "express";

import CaughtError from "../utils/Caught-Error.util";

import { logger } from "../index";

import HTTP_ERRORS from "../const/HTTP-ERRORS.const";

export default async function processError(error: unknown, req: Request, res: Response, _next): Promise<void> {
  if(error instanceof CaughtError) {
    res.status(error.options.client.code).send(error.options.client);
    logger.terminal.error(error.options.server.message);
  } else if(error instanceof Error) {
    res.status(500).send(HTTP_ERRORS.INTERNAL_SERVER_ERROR());
    logger.terminal.error(error.message);
  } else {
    res.status(500).send(HTTP_ERRORS.INTERNAL_SERVER_ERROR());
    logger.terminal.error("Uncaught server error!");
  }
};
