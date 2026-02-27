import type { Row, RowList } from "postgres";

import { sql } from "../index";

class SQLRepository<T = unknown> {
  public table: string = "";

  constructor(table: string) {
    this.table = table;
  };

  public async insert(data: T): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql`INSERT INTO ${sql(this.table)} ${sql(data as any, keys)}`;
  };

  public async getBy(column: string, value: any): Promise<T | undefined> {
    const res: T | undefined = (await sql`SELECT * FROM ${sql(this.table)} WHERE ${sql(column)} = ${value} LIMIT 1`).at(-1) as T | undefined;
    return res;
  };

  public async getById(id: string): Promise<T | undefined> {
    const res: T | undefined = (await sql`SELECT * FROM ${sql(this.table)} WHERE id = ${id} LIMIT 1`).at(-1) as T | undefined;
    return res;
  };

  public async updateById(id: string, data: Partial<T>): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql`UPDATE ${sql(this.table)} SET ${sql(data as any, keys)} WHERE id = ${id}`;
  };

  public async isExist(column: string, value: any): Promise<boolean> {
    const res: RowList<Row[]> = await sql`SELECT ${sql(column)} FROM ${sql(this.table)} WHERE ${sql(column)} = ${value} LIMIT 1`;
    return res.length != 0;
  };
};

export default SQLRepository;
