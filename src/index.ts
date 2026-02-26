import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";

import userRoute from "./routes/user/user.route";
import dirRoute from "./routes/dir/dir.route";

dotenv.config();

export const logger = createLogger();
export const sql = connectToPostgers();
const server = express();

server
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .post("/user/log-up", ...userRoute.logUp)
  .get("/user/init", ...userRoute.init)
  .get("/dir/read", ...dirRoute.read)
  .post("/dir/copy", ...dirRoute.copy)
  .listen(process.env.SERVER_PORT)
