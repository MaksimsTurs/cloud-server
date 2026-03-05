import type { StorageObject } from "../../index.type";

import generateId from "../../utils/generate-id.util";

export default async function create(data: StorageObject): Promise<StorageObject> {
  const id: string = generateId();
  const newObject: StorageObject = {
    ...data,
    id: data.id || id,
  };

  return newObject;
};
