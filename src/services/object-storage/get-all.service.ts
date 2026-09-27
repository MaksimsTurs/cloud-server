import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageServiceGetAllReturn } from "./object-storage-service.type"

import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function getAll(user: User, id?: string): Promise<ObjectStorageServiceGetAllReturn> {
  const parentId: string = id || user.id;
  const items: StorageObject[] = await objectStorageRepo.getAll(user.id, parentId);  
  const parent: StorageObject = items.pop()!;

  return { items, parent };
};
