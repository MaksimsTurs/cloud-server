import type { StorageObject } from "../../index.type";
import type { ObjectStorageServiceCreateParam } from "./object-storage-service.type";

import generateId from "../../utils/generate-id.util";

export default async function create(data: ObjectStorageServiceCreateParam): Promise<StorageObject> {
  const newObject: StorageObject = {
    ...data,
    id: data.id || generateId(),
  };

  return newObject;
};
