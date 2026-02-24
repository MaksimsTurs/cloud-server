import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectToPostgers from "./configs/postgres.config";
import createLogger from "./configs/logger.config";

dotenv.config();

export const logger = createLogger();
export const sql = connectToPostgers();
const server = express();

server
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .listen(process.env.SERVER_DEV_PORT)
