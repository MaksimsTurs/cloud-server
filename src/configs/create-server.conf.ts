import type { Multer } from "multer";
import type { ApplicationConf } from "../Application.type";
import type { Express } from "express";

import createUserRouter from "../routes/user/user.route";
import createObjectStorageRouter from "../routes/object-storage/object-storage.route";
import defaultRoute from "../routes/404.route";

import handleError from "../middlewares/handle-errors.middleware";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// TODO: Replace rate limitter middleware with rate limitter from haproxy.
export default function createServer(conf: ApplicationConf, uploader: Multer): Express {
  return express()
    .disable("x-powered-by")
    .disable("etag")
    .use(cors({ origin: conf.ALLOWED_ORIGIN, credentials: true }))
    .use(express.json({ limit: 50000 /* 50 kb */ }))
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use("/user",         createUserRouter())
    .use("/storage",      createObjectStorageRouter(uploader))
    .all("/{*splat}",     defaultRoute, handleError);
};
