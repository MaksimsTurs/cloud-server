import type { StorageObject } from "../index.type";

import app from "../Application";

import SQLRepository from "./SQL.repo";

class ObjectStorageRepository extends SQLRepository<StorageObject> {
  public constructor() {
    super({ table: "t_storage_objects" });
  };

  public async getAll(userId: string, parentId: string): Promise<StorageObject[]> {
    const { sql } = app.context;

    const res = await sql<StorageObject[]>`
      SELECT * FROM(
        SELECT * FROM ${sql(this.options.table)}
        WHERE parent_id = ${parentId} AND
              user_id = ${userId} AND NOT
              id = ${parentId}
        
        UNION ALL 

        SELECT * FROM ${sql(this.options.table)}
        WHERE id = ${parentId} AND
              user_id = ${userId}
      )
    `;

    return res;
  };
};

export default new ObjectStorageRepository();
