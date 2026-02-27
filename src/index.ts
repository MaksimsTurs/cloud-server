import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";
import createUploader from "./configs/multer.config";

import userRoute from "./routes/user/user.route";
import dirRoute from "./routes/dir/dir.route";

export const logger = createLogger();
export const sql = connectToPostgers();
const uploader = createUploader();
const server = express();

server
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .post("/user/log-up", ...userRoute.logUp)
  .get("/user/log-out", ...userRoute.logOut)
  .get("/user/init", ...userRoute.init)

  .get("/dir/read", ...dirRoute.read)
  .post("/dir/copy", ...dirRoute.copy)
  .post("/dir/move", ...dirRoute.move)
  .post("/dir/remove", ...dirRoute.remove)
  .post("/dir/create", ...dirRoute.create)
  .post("/dir/upload", uploader.any(), ...dirRoute.upload)
  .listen(process.env.SERVER_PORT)
