import type { Sql } from "postgres";

import postgres from "postgres";

import { serverConfigs } from "../index";

export default function connectToPostgres(): Sql {
  return postgres({
    host: serverConfigs.POSTGRES_HOST,
    port: serverConfigs.POSTGRES_PORT,
    user: serverConfigs.POSTGRES_USER,
    database: serverConfigs.POSTGRES_DATABASE,
    password: serverConfigs.POSTGRES_PASSWORD,
    ssl: { rejectUnauthorized: true, ca: serverConfigs.POSTGRES_CA_CERTIFICATE }
  });
};
