import type { StorageObject } from "../index.type";

import { sql } from "../index";

import SQLRepository from "./SQL.repo";

class ObjectStorageRepository extends SQLRepository<StorageObject> {
  constructor() {
    super("t_storage_objects");
  };

  public async getAllObjects(userId: string, parentId: string): Promise<StorageObject[]> {
    const res = await sql<StorageObject[]>`
      SELECT * FROM(
        SELECT * FROM ${sql(this.table)}
        WHERE id = ${parentId} AND
              user_id = ${userId}

        UNION ALL

        SELECT * FROM ${sql(this.table)}
        WHERE parent_id = ${parentId} AND
              user_id = ${userId}
      )
    `;
    return res;
  };
};

export default new ObjectStorageRepository();
