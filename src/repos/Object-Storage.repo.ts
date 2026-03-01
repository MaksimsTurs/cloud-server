import type { StorageObject } from "../index.type";

import { sql } from "../index";

import SQLRepository from "./SQL.repo";

class ObjectStorageRepository extends SQLRepository<StorageObject> {
  constructor() {
    super("t_storage_objects");
  };

  public async getAllObjects(userId: string, parentId: string): Promise<StorageObject[]> {
    const res = await sql<StorageObject[]>`
      SELECT * FROM ${sql(this.table)}
      WHERE user_id = ${userId} AND
            parent_id = ${parentId}
    `;
    return res;
  };
};

export default new ObjectStorageRepository();
