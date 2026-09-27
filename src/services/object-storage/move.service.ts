import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageMoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type.ts";

import { HTTP401Error, HTTP400Error, HTTP409Error } from "../../utils/HTTP-Error.util.ts";

import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function move(user: User, body: ObjectStorageMoveObjectsReqBody): Promise<void> {
  const items: Record<string, StorageObject> = body.items;
  const parent: StorageObject | undefined = await objectStorageRepo.getById(body.parentId);

  if(!parent) {
    throw new HTTP401Error(
      `User ${user.id} has tried to move objects into not existing directory ${body.parentId}`,
      "You can not move objects into not existing directory!"
    );
  }

  for(let id in items) {
    const item: StorageObject = items[id];

    if(item.is_root) {
      throw new HTTP400Error(
        `User ${user.id} has tried to move root directory`,
        "You can not move root directory"
      );
    }

    if(id === parent.id) {
      throw new HTTP409Error(
        `User ${user.id} has tried to move directory ${item.id} into itself`,
        `You cannot move ${item.name} into itself!`
      );
    }

    if(await objectStorageRepo.isExist({ parent_id: parent.id, name: item.name })) {
      throw new HTTP409Error(
        `User ${user.id} has tried to move object ${item.name} that already exist in directory ${parent.id}`,
        "Object with the same name already exist!"
      );
    }

    await objectStorageRepo.updateById(item.id, { parent_id: parent.id });
  } 
};
