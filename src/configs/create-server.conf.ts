import type { Multer } from "multer";
import type { ApplicationConf } from "../Application.type";
import type { Express } from "express";

import initUserRouter from "../routes/user/user.route";
import initObjectStorageRouter from "../routes/object-storage/object-storage.route";
import defaultRoute from "../routes/404.route";

import handleError from "../middlewares/handle-errors.middleware";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export default function createServer(conf: ApplicationConf, uploader: Multer): Express {
  const server: Express = express();

  server
    .disable("x-powered-by")
    .use(cors({ origin: conf.ALLOWED_ORIGINS, credentials: true }))
    .use(express.json({ limit: 50000 /* 50 kb */ }))
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use("/user",         initUserRouter())
    .use("/storage",      initObjectStorageRouter(uploader))
    .all("/{*splat}",     defaultRoute, handleError)

  return server;
};
