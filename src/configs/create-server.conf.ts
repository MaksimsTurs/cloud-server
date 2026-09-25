import type { Multer } from "multer";
import type { ApplicationConf } from "../Application.type";
import type { Express } from "express";

import createUserRouter from "../routes/user/user.route";
import initObjectStorageRouter from "../routes/object-storage/object-storage.route";
import defaultRoute from "../routes/404.route";
import rateLimitter from "../middlewares/rate-limitter.middleware";

import handleError from "../middlewares/handle-errors.middleware";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import RATE_LIMITTER from "../const/RATE_LIMITTER.const";

export default function createServer(conf: ApplicationConf, uploader: Multer): Express {
  const server: Express = express();

  server
    .disable("x-powered-by")
    .disable("etag")
    .use(cors({ origin: conf.ALLOWED_ORIGINS, credentials: true }))
    .use(express.json({ limit: 50000 /* 50 kb */ }))
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use("/user",         createUserRouter())
    .use("/storage",      initObjectStorageRouter(uploader))
    .all("/{*splat}",     
      rateLimitter({
        maxRequestsPerWindow: RATE_LIMITTER.RARELY_USED_ROUTE,
        windowInMs: RATE_LIMITTER.WINDOW_10MIN
      }), 
      defaultRoute, 
      handleError
    )

  return server;
};
