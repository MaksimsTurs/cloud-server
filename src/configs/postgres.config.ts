import type { Sql } from "postgres";

import postgres from "postgres";

import { logger } from "../index";

export default function connectToPostgres(): Sql {
  logger.terminal.info("Connecting to Postgres");

  return postgres({
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(process.env.POSTGRES_PORT as string),
    user: process.env.POSTGRES_USER as string,
    database: process.env.POSTGRES_DATABASE as string,
    password: process.env.POSTGRES_PASSWORD as string,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.POSTGRES_CA_CERTIFICATE as string
    }
  });
};
