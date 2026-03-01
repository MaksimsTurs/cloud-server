import type { StorageObject, User } from "../../index.type";
import type { CreateStorageObjectReqBody } from "../../routes/dir/dir.type";

import OBJECT_STORAGE_TYPES from "../../const/DIR-ITEM-TYPES.const";

import objectStorageRepo from "../../repos/Object-Storage.repo";
import generateId from "../../utils/generate-id.util";

export default async function create(user: User, body: CreateStorageObjectReqBody): Promise<StorageObject> {
  const { name } = body;

  const dirId: string = generateId();
  const parentId: string = body.parentId || user.id;
  const newObject: StorageObject = {
    id: dirId,
    parent_id: parentId,
    user_id: user.id,
    name,
    type: OBJECT_STORAGE_TYPES.DIR
  };

  await objectStorageRepo.insert(newObject);

  return newObject;
};
