import type { Express } from "express";
import type { Sql } from "postgres";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import Logger from "./utils/Logger.js/src/Logger";

import connectToPostgers from "./configs/postgres.config";

dotenv.config();

export const logger: Logger<"dev"> = new Logger<"dev">({
  mode: "dev"
});
export const sql: Sql = connectToPostgers();
const server: Express = express();

server
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .listen(process.env.SERVER_DEV_PORT)
