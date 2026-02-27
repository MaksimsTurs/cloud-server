import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";
import createUploader from "./configs/multer.config";

import initUserRouter from "./routes/user/user.route";
import initDirRouter from "./routes/dir/dir.route";
import defaultRoute from "./routes/404.route";

import handleError from "./middlewares/handle-errors.middleware";

import getCorsOrigin from "./utils/get-cors-origin.util";

export const logger = createLogger();
export const sql = connectToPostgers();
export const uploader = createUploader();
const server = express();

server
  .use(cors({ origin: getCorsOrigin(), credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use("/user",     initUserRouter())
  .post("/dir",     initDirRouter(uploader))
  .all("/{*splat}", defaultRoute, handleError)
  .listen(process.env.SERVER_PORT)
