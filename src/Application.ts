import type { ApplicationImpl, ApplicationContext, ApplicationConf, ApplicationModes } from "./Application.type";
import type { Express } from "express";
import type { Sql } from "postgres";
import type { Multer } from "multer";
import type { EmailTransporter } from "./configs/create-email-transporter.config";

import pck from "../package.json";

import Logger from "@maksims/logger.js";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

import defineServerConf from "./configs/define-server-conf.config";
import connectToPostgres from "./configs/connect-to-postgres.config";
import createUploader from "./configs/create-multer.config";
import createEmailTransporter from "./configs/create-email-transporter.config";
import createLogger from "./configs/create-logger.config";
import createServer from "./configs/create-server.conf";

class Application implements ApplicationImpl {
  public context: ApplicationContext

  public constructor() {
    try {
      const conf: ApplicationConf = defineServerConf();
      const logger: Logger<ApplicationModes> = createLogger(conf);
      const sql: Sql = connectToPostgres(conf);
      const uploader: Multer = createUploader();
      const server: Express = createServer(conf, uploader);
      const emailTransporter: EmailTransporter = createEmailTransporter(conf);
    
      logger.console.info(`Initialize application v${pck.version}`);

      this.context = { logger, conf, uploader, server, emailTransporter, sql };
    } catch(error) {
      if(error instanceof Error) {
        throw new Error(`Application initialization fails, cause: ${error.message}`);
      }

      throw new Error("Application initialization fails!");
    }
  };

  public async start(): Promise<void> {
    const { conf, server, logger } = this.context;

    logger.console.info("Start application");

    try {
      if(!existsSync(conf.BASE_STORAGE_PATH)) {
        logger.console.info(`Creating storage directory ${conf.BASE_STORAGE_PATH}`);
        await mkdir(conf.BASE_STORAGE_PATH);
      }

      if(!existsSync(conf.BASE_TMP_PATH)) {
        logger.console.info(`Creating tmp directory ${conf.BASE_TMP_PATH}`);
        await mkdir(conf.BASE_TMP_PATH);
      }
    } catch(error) {
      if(error instanceof Error) {
        logger.console.error(`Directory creation fails, cause: ${error.message}`);
      } else {
        logger.console.error("Directory creation fails, cause: Unknown error", error);
      }
    }
    
    logger.console.info(`Start server on ${conf.HOST}:${conf.PORT}`);
    
    try {
      server.listen(conf.PORT, conf.HOST);
    } catch(error) {
      if(error instanceof Error) {
        logger.console.error(`Server start fails, cause: ${error.message}`);
      } else {
        logger.console.error("Server start fails, cause: Unknown error", error);
      }
    }
  };
};

const app = new Application();
export default app;
