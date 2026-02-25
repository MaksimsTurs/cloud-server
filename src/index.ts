import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";

import userRoute from "./routes/user/user.route";

dotenv.config();

export const logger = createLogger();
export const sql = connectToPostgers();
const server = express();

server
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .post("/user/log-up", ...userRoute.logUp)
  .listen(process.env.SERVER_DEV_PORT)
