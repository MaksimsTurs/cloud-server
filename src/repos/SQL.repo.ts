import type { PendingQuery, Row, RowList } from "postgres";

import joinSqlQueries from "../utils/join-sql-queries.util";

import { sql } from "../index";

class SQLRepository<T extends object> {
  public table: string = "";

  constructor(table: string) {
    this.table = table;
  };

  public async insertOne(data: T): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql<T[]>`INSERT INTO ${sql(this.table)} ${sql(data as any, keys)}`;
  };

  public async getOne(data: Partial<T>): Promise<T | undefined> {
    const conditions: PendingQuery<Row[]>[] = [];

    for(let key in data) {
      const value: any = data[key];
      conditions.push(sql`${sql(key as string)} = ${value}`);
    }

    const filters: PendingQuery<Row[]>[] = joinSqlQueries(conditions, sql` AND `);
    const res: RowList<T[]> = await sql<T[]>`SELECT * FROM ${sql(this.table)} WHERE ${filters} LIMIT 1`;
    
    return res.at(-1);
  };

  public async getById(id: string): Promise<T | undefined> {
    const res: RowList<T[]> = await sql<T[]>`SELECT * FROM ${sql(this.table)} WHERE id = ${id} LIMIT 1`;
    return res.at(-1);
  };

  public async removeOne(column: string, value: any): Promise<void> {
    await sql<T[]>`DELETE FROM ${sql(this.table)} WHERE ${sql(column)} = ${value}`
  };

  public async updateById(id: string, data: Partial<T>): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql<T[]>`UPDATE ${sql(this.table)} SET ${sql(data as any, keys)} WHERE id = ${id}`;
  };

  public async isExist(column: string, value: any): Promise<boolean> {
    const res: RowList<Row[]> = await sql<T[]>`SELECT ${sql(column)} FROM ${sql(this.table)} WHERE ${sql(column)} = ${value} LIMIT 1`;
    return res.length != 0;
  };
};

export default SQLRepository;
