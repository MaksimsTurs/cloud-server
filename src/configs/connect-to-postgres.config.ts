import type { Sql } from "postgres";
import type { ApplicationConf } from "../Application.type";

import postgres from "postgres";

export default function connectToPostgres(conf: ApplicationConf): Sql {
  const ssl = conf.MODE === "dev" ? false : { rejectUnauthorized: true, ca: conf.POSTGRES_CA_CERTIFICATE };
  return postgres({
    host: conf.POSTGRES_HOST,
    port: conf.POSTGRES_PORT,
    user: conf.POSTGRES_USER,
    database: conf.POSTGRES_DATABASE,
    password: conf.POSTGRES_PASSWORD,
    ssl
  });
};
