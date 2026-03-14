import type { Response, Request, NextFunction } from "express";

import { ValidationError } from "@vinejs/vine";

import CaughtError from "../utils/Caught-Error.util";

import { logger } from "../index";

import HTTP_ERRORS from "../const/HTTP-ERRORS.const";
import COOKIE from "../const/COOKIE.const";

export default async function handleError(error: unknown, _req: Request, res: Response, _next: NextFunction): Promise<void> {
  if(error instanceof CaughtError) {
    res.status(error.options.client.code).send(error.options.client);

    if(error.options.server) {
      logger.terminal.error(error.options.server.message);
    }
  } if(error instanceof ValidationError) {
    if(error.messages[0].field === COOKIE.ACCESS_TOKEN_KEY ||
       error.messages[0].field === COOKIE.REFRESH_TOKEN_KEY) {
      res.status(401).send(HTTP_ERRORS.UNAUTHORIZED());
    } else {
      res.status(400).send(HTTP_ERRORS.BAD_REQUEST(error.messages[0].message));
    }

    logger.terminal.error("Validation failed", error.messages);
  } else if(error instanceof Error) {
    res.status(500).send(HTTP_ERRORS.INTERNAL_SERVER_ERROR());
    logger.terminal.error(error.message, error.stack);
  } else {
    res.status(500).send(HTTP_ERRORS.INTERNAL_SERVER_ERROR());
    logger.terminal.error("Uncaught server error!");
  }
};
