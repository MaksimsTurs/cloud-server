import type { Express } from "express";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server: Express = express();

server
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .listen(process.env.SERVER_DEV_PORT)

export default server;
