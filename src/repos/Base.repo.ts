import type { Row, RowList } from "postgres";

import { sql } from "../index";

class BaseRepository {
  public name: string = "";

  constructor(name: string) {
    this.name = name;
  };

  public async insert<D>(data: D): Promise<void> {
    const keys: string[] = Object.keys(data as any);
    await sql`INSERT INTO ${sql(this.name)} ${sql(data as any, keys)}`;
  };

  public async isExist(column: string, value: any): Promise<boolean> {
    const res: RowList<Row[]> = await sql`SELECT ${sql(column)} FROM ${sql(this.name)} WHERE ${sql(column)} = ${value} LIMIT 1`;
    return res.length != 0;
  };
};

export default BaseRepository;
