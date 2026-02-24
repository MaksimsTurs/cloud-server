import type { Express } from "express";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import Logger from "./utils/Logger.js/src/Logger"

dotenv.config();

const server: Express = express();
export const logger = new Logger({
  mode: "dev"
});

server
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .listen(process.env.SERVER_DEV_PORT)

export default server;
