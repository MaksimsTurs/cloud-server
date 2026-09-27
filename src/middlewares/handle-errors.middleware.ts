import type { Response, Request } from "express";

import { ValidationError } from "@vinejs/vine";

import { HTTPError } from "../utils/HTTP-Error.util";

import app from "../Application";

import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";
import COOKIE from "../const/COOKIE.const";

export default async function handleError(
  error: unknown, 
  _req: Request, 
  res: Response
): Promise<void> {
  const { logger } = app.context;

  if(error instanceof HTTPError) {
    const { code, clientMessage, serverMessage } = error.options;

    res.status(code).send({ code, message: clientMessage });

    if(serverMessage) {
      logger.console.error(serverMessage);
    }
  } else if(error instanceof ValidationError) {
    if(error.messages[0].field === COOKIE.ACCESS_TOKEN_KEY || 
       error.messages[0].field === COOKIE.REFRESH_TOKEN_KEY) {
      res
        .status(HTTP_ERROR_CODES.UNAUTHORIZED)
        .send({ code: HTTP_ERROR_CODES.UNAUTHORIZED, message: "Unauthorized!" });
    } else {
      res
        .status(HTTP_ERROR_CODES.BAD_REQUEST)
        .send({ code: HTTP_ERROR_CODES.BAD_REQUEST, message: error.messages[0].message });
    }

    logger.console.error(`Validation error, ${error.messages[0].message}`);
  } else if(error instanceof Error) {
    res
      .status(HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR)
      .send({ code: HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR, message: "Internal Server Error!" });
    logger.console.error(error.message);
  } else {
    res
      .status(HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR)
      .send({ code: HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR, message: "Internal Server Error!" });
    logger.console.error("Uncaught server error!");
  }
};
