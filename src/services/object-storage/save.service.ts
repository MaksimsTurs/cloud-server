import type { StorageObject } from "../../index.type";

import storageRepo from "../../repos/Object-Storage.repo";

export default async function save(object: StorageObject): Promise<void> {
  await storageRepo.insertOne(object);
};
