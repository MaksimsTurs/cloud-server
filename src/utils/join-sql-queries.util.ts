import { PendingQuery, Row } from "postgres";

export default function joinSqlQueries(queries: PendingQuery<Row[]>[], joiner: PendingQuery<Row[]>): PendingQuery<Row[]>[] {
  return queries.flatMap((querie, index) => index ? [joiner, querie] : querie);
};
