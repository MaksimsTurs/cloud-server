import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";

import userRoute from "./routes/user/user.route";

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
  .get("/user/auth", ...userRoute.initUser)
  .listen(process.env.SERVER_PORT)
