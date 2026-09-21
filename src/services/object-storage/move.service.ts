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
      `User(${user.id}) has tried to move items into not existing folder(${body.parentId}).`,
      "You can not move items into not existing folder!"
    );
  }

  for(let name in items) {
    const item: StorageObject = items[name];

    if(item.id === parent.id) {
      throw new CaughtError(
        HTTP_ERROR_CODES.CONFLICT,
        `User(${user.id}) has tried to move the folder(${item.id}) into itself.`,
        "You cannot move these folder here!"
      );
    }

    const isExist: boolean = !!(await objectStorageRepo.getOne({ parent_id: parent.id, name: item.name }));

    if(isExist) {
      throw new CaughtError(
        HTTP_ERROR_CODES.CONFLICT,
        `User(${user.id}) has tried to move item(${item.name}) that already exist in folder(${parent.id}).`,
        "Item with the same name already exist!"
      );
    }

    await objectStorageRepo.updateById(item.id, { parent_id: parent.id });
  } 
};
