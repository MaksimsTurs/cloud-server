import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageMoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type.ts";

import CaughtError from "../../utils/Caught-Error.util";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const.ts";

export default async function move(user: User, body: ObjectStorageMoveObjectsReqBody): Promise<void> {
  const items: Record<string, StorageObject> = body.items;
  const parent: StorageObject | undefined = await objectStorageRepo.getById(body.parentId);

  if(!parent) {
    throw new CaughtError(
      HTTP_ERROR_CODES.BAD_REQUEST,
      `${user.id} has tried to move items into not existing directory!`,
      "You can not move items into not existing directory!"
    );
  }

  for(let name in items) {
    const item: StorageObject = items[name];
    const isExist: boolean = !!(await objectStorageRepo.getOne({ parent_id: parent.id, name: item.name }));

    if(isExist) {
      throw new CaughtError(
        HTTP_ERROR_CODES.CONFLICT,
        `${user.id} has tried to move item (${item.name}) that already exist in ${parent.id} directory`,
        "Item with the same name already exist!"
      );
    }

    await objectStorageRepo.updateById(item.id, { parent_id: parent.id });
  } 
};
