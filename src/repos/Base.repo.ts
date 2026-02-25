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
};

export default BaseRepository;
