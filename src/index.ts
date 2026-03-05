import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";
import createUploader from "./configs/multer.config";
import defineServerConfig from "./configs/define-server-config.config";

import initUserRouter from "./routes/user/user.route";
import initObjectStorageRouter from "./routes/object-storage/object-storage.route";
import defaultRoute from "./routes/404.route";

import handleError from "./middlewares/handle-errors.middleware";

export const serverConfigs = defineServerConfig();
export const logger = createLogger();
export const sql = connectToPostgers();
export const uploader = createUploader();
const server = express();

server
  .use(cors({ origin: serverConfigs.ALLOWED_ORIGINS, credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use("/user",         initUserRouter())
  .use("/storage",      initObjectStorageRouter(uploader))
  .all("/{*splat}",     defaultRoute, handleError)
  .listen(serverConfigs.PORT)
