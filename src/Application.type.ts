import type { Sql } from "postgres";
import type { Multer } from "multer";
import type { Express } from "express";
import type { EmailTransporter } from "./configs/create-email-transporter.config";
import type Logger from "@maksims/logger.js";

import defineServerConf from "./configs/define-server-conf.config";

export type ApplicationImpl = {
  context: ApplicationContext
  start: () => void;
};

export type ApplicationContext = {
  server: Express
  sql: Sql
  conf: ApplicationConf
  logger: Logger<ApplicationModes>
  uploader: Multer
  emailTransporter: EmailTransporter
};

export type ApplicationConf = ReturnType<typeof defineServerConf>;

export type ApplicationModes = "dev" | "prod";
