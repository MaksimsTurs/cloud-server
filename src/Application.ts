import type { ApplicationImpl, ApplicationContext, ApplicationConf, ApplicationModes } from "./Application.type";
import type { Express } from "express";
import type { Sql } from "postgres";
import type { Multer } from "multer";
import type { EmailTransporter } from "./configs/create-email-transporter.config";

import pck from "../package.json";

import Logger from "@maksims/logger.js";

import defineServerConf from "./configs/define-server-conf.config";
import createSQLClient from "./configs/create-sql-client.config";
import createUploader from "./configs/create-multer.config";
import createEmailTransporter from "./configs/create-email-transporter.config";
import createLogger from "./configs/create-logger.config";
import createServer from "./configs/create-server.conf";
import createDirectories from "./configs/create-directories.conf";

class Application implements ApplicationImpl {
  public context: ApplicationContext

  public constructor() {
    try {
      const conf: ApplicationConf = defineServerConf();
      const logger: Logger<ApplicationModes> = createLogger(conf);
      const sql: Sql = createSQLClient(conf);
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
    const { conf, server, sql, emailTransporter, logger } = this.context;

    logger.console.info("Start application");

    logger.console.info(`Creating directory if not exists ${conf.BASE_STORAGE_PATH}`); 
    logger.console.info(`Creating directory if not exists ${conf.BASE_TMP_PATH}`);
    await tryStartService(
      async () => await createDirectories(conf),
      "Directories creation failed"
    );
  
    logger.console.info(`Checking PostgreSQL connection ${conf.POSTGRES_HOST}:${conf.POSTGRES_PORT}`);
    await tryStartService(
      async () => await sql`SELECT 1`,
      "PostgreSQL connection failed"
    );

    logger.console.info(`Checking email transporter connection ${conf.NODEMAILER_HOST}:${conf.NODEMAILER_PORT}`);
    await tryStartService(
      async () => await emailTransporter.verify(),
      "Email transporter connection failed"
    );

    logger.console.info(`Starting server on ${conf.HOST}:${conf.PORT}`);
    await tryStartService(
      async () => server.listen(conf.PORT, conf.HOST),
      "Server start failed"
    );
  };
};

const app = new Application();

async function tryStartService(callback: () => Promise<any>, message: string): Promise<void> {
  try {
    await callback();
  } catch(error) {
    const { logger } = app.context;

    if(error instanceof Error) {
      logger.console.error(`${message}, cause: ${error.message}`);
    } else {
      logger.console.error(`${message}, cause: Unknown error`, error);
    }
  }
};

export default app;
