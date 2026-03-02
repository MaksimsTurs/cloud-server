import type { StorageObject, User } from "../../index.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function read(user: User, id?: string): Promise<StorageObject[]> {
  let parentId: string = id || user.id;
  let items: StorageObject[] = [];

  items = await objectStorageRepo.getAllObjects(user.id, parentId);

  return items;
};
