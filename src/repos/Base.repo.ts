import type { Row, RowList } from "postgres";

import { sql } from "../index";

class BaseRepository<T = unknown> {
  public name: string = "";

  constructor(name: string) {
    this.name = name;
  };

  public async insert(data: T): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql`INSERT INTO ${sql(this.name)} ${sql(data as any, keys)}`;
  };

  public async getBy(column: string, value: any): Promise<T | undefined> {
    const res: T | undefined = (await sql`SELECT * FROM ${sql(this.name)} WHERE ${sql(column)} = ${value} LIMIT 1`).at(-1) as T | undefined;
    return res;
  };

  public async getById(id: string): Promise<T | undefined> {
    const res: T | undefined = (await sql`SELECT * FROM ${sql(this.name)} WHERE id = ${id} LIMIT 1`).at(-1) as T | undefined;
    return res;
  };

  public async updateById(id: string, data: Partial<T>): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql`UPDATE ${sql(this.name)} SET ${sql(data as any, keys)} WHERE id = ${id}`;
  };

  public async isExist(column: string, value: any): Promise<boolean> {
    const res: RowList<Row[]> = await sql`SELECT ${sql(column)} FROM ${sql(this.name)} WHERE ${sql(column)} = ${value} LIMIT 1`;
    return res.length != 0;
  };
};

export default BaseRepository;
