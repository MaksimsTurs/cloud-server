import type { Response, Request, NextFunction } from "express";

import { ValidationError } from "@vinejs/vine";

import CaughtError from "../utils/Caught-Error.util";

import { logger } from "../index";

import HTTP_ERRORS from "../const/HTTP-ERRORS.const";

export default async function handleError(error: unknown, _req: Request, res: Response, _next: NextFunction): Promise<void> {
  if(error instanceof CaughtError) {
    res.status(error.options.client.code).send(error.options.client);

    if(error.options.server) {
      logger.terminal.error(error.options.server.message);
    }
  } else if(error instanceof ValidationError) {
    res.status(400).send(HTTP_ERRORS.BAD_REQUEST(error.messages[0].message));
    logger.terminal.error("Validation failed", error.messages);
  } else if(error instanceof Error) {
    res.status(500).send(HTTP_ERRORS.INTERNAL_SERVER_ERROR());
    logger.terminal.error(error.message);
  } else {
    res.status(500).send(HTTP_ERRORS.INTERNAL_SERVER_ERROR());
    logger.terminal.error("Uncaught server error!");
  }
};
