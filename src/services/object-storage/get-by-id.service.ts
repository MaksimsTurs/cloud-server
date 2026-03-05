import type { StorageObject } from "../../index.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function getById(id: string): Promise<StorageObject | undefined> {
  return objectStorageRepo.getById(id);
};
