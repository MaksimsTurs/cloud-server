import type { PendingQuery, Row, RowList } from "postgres";
import type { CipherGCM, DecipherGCM } from "node:crypto";

import joinSqlQueries from "../utils/join-sql-queries.util";

import app from "../Application";

import crypto from "node:crypto";

type SQLRepositoryConstructorOptions = {
  table: string
  fieldsToEncrypt?: string[];
};

class SQLRepository<T extends object> {
  public options: SQLRepositoryConstructorOptions;

  public constructor(options: SQLRepositoryConstructorOptions) {
    this.options = options;
  };

  public async insertOne(data: T): Promise<void> {
    const { sql } = app.context;
    const keys: string[] = Object.keys(data as any);
    await sql<T[]>`INSERT INTO ${sql(this.options.table)} ${sql(this.encrypt(data) as any, keys)}`;
  };

  public async getOne(data: Partial<T>): Promise<T | undefined> {
    const { sql } = app.context;
    const res: RowList<T[]> = await sql<T[]>`SELECT * FROM ${sql(this.options.table)} WHERE ${this.createFilter(data)} LIMIT 1`;
    return res.at(-1);
  };

  public async getById(id: string): Promise<T | undefined> {
    const { sql } = app.context;
    const res: RowList<T[]> = await sql<T[]>`SELECT * FROM ${sql(this.options.table)} WHERE id = ${id} LIMIT 1`;
    return res.at(-1);
  };

  public async removeMany(data: Partial<T>): Promise<void> {
    const { sql } = app.context;
    await sql<T[]>`DELETE FROM ${sql(this.options.table)} WHERE ${this.createFilter(data)}`;
  };

  public async removeOne(data: Partial<T>): Promise<void> {
    const { sql } = app.context;
    await sql<T[]>`DELETE FROM ${sql(this.options.table)} WHERE ${this.createFilter(data)}`;
  };

  public async removeById(id: string): Promise<void> {
    const { sql } = app.context;
    await sql<T[]>`DELETE FROM ${sql(this.options.table)} WHERE id = ${id}`;
  };

  public async updateById(id: string, data: Partial<T>): Promise<void> {
    const { sql } = app.context;
    const keys: string[] = Object.keys(data as any);
    await sql<T[]>`UPDATE ${sql(this.options.table)} SET ${sql(this.encrypt(data) as any, keys)} WHERE id = ${id}`;
  };

  public async isExist(data: Partial<T>): Promise<boolean> {
    return !!(await this.getOne(data));
  };

  private createFilter(data: Partial<T>): PendingQuery<Row[]>[] {
    const { sql } = app.context;
    const conditions: PendingQuery<Row[]>[] = [];

    for(let key in data) {
      const value: any = data[key];
      conditions.push(sql`${sql(key as string)} = ${value}`);
    }

    return joinSqlQueries(conditions, sql` AND `);
  };

  public encrypt(data: Partial<T>): Partial<Record<keyof T, any>> {
    const encrypted: Partial<Record<keyof T, any>> = {...data };
    const { fieldsToEncrypt } = this.options;
    const { conf } = app.context;

    if(!fieldsToEncrypt || !fieldsToEncrypt.length) {
      return data;
    }

    for(let index: number = 0; index < fieldsToEncrypt.length; index++) {
      const key = fieldsToEncrypt[index] as keyof T;
      const value: string = (data[key] as any).toString?.();
      const iv: Buffer = crypto.randomBytes(conf.AES_IV_SIZE);
      const cipher = crypto.createCipheriv(conf.AES_ALGORITHM, conf.AES_SECRET, iv) as CipherGCM;

      encrypted[key] = cipher.update(value, "utf8", "hex");
      encrypted[key] += cipher.final("hex");
      encrypted[key] = `${iv.toString("hex")}:${cipher.getAuthTag().toString("hex")}:${encrypted[key]}`;
    }

    return encrypted;
  };
  
  public decrypt(data: Partial<T>): Partial<Record<keyof T, any>> {
    const decrypted: Partial<Record<keyof T, any>> = {...data };
    const { fieldsToEncrypt } = this.options;
    const { conf } = app.context;

    if(!fieldsToEncrypt || !fieldsToEncrypt.length) {
      return data;
    }

    for(let index: number = 0; index < fieldsToEncrypt.length; index++) {
      const key = fieldsToEncrypt[index] as keyof T;
      const [ivHex, authTagHex, encryptedHex] = (data[key] as string).split(":");
      const decipher = crypto.createDecipheriv(conf.AES_ALGORITHM, conf.AES_SECRET, Buffer.from(ivHex!, "hex")) as DecipherGCM;
      
      decipher.setAuthTag(Buffer.from(authTagHex!, "hex"));
      decrypted[key] = decipher.update(encryptedHex!, "hex", "utf8");
      decrypted[key] += decipher.final("utf8");
    }

    return decrypted;  
  };
};

export default SQLRepository;
