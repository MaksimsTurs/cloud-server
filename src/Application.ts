import type { ApplicationImpl, ApplicationContext, ApplicationConf, ApplicationModes } from "./Application.type";
import type { Express } from "express";
import type { Sql } from "postgres";
import type { Multer } from "multer";
import type { EmailTransporter } from "./configs/create-email-transporter.config";

import pck from "../package.json";

import Logger from "@maksims/logger.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import defineServerConf from "./configs/define-server-conf.config";
import connectToPostgres from "./configs/connect-to-postgres.config";
import createUploader from "./configs/create-multer.config";
import createEmailTransporter from "./configs/create-email-transporter.config";
import createLogger from "./configs/create-logger.config";

import initUserRouter from "./routes/user/user.route";
import initObjectStorageRouter from "./routes/object-storage/object-storage.route";
import defaultRoute from "./routes/404.route";

import handleError from "./middlewares/handle-errors.middleware";

class Application implements ApplicationImpl {
  public context: ApplicationContext

  public constructor() {
    try {
      const conf: ApplicationConf = defineServerConf();
      const logger: Logger<ApplicationModes> = createLogger(conf);
      const sql: Sql = connectToPostgres(conf);
      const server: Express = express();
      const uploader: Multer = createUploader();
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

  public start(): void {
    const { conf, server, uploader, logger } = this.context;
    
    logger.console.info("Start application");
    logger.console.info(`Start server on ${conf.HOST}:${conf.PORT}`);
    
    try {
      server
        .use(cors({ origin: conf.ALLOWED_ORIGINS, credentials: true }))
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(cookieParser())
        .use("/user",         initUserRouter())
        .use("/storage",      initObjectStorageRouter(uploader))
        .all("/{*splat}",     defaultRoute, handleError)
        .listen(conf.PORT, conf.HOST);
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
