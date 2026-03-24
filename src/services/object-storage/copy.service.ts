import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageCopyReqBody } from "../../routes/object-storage/object-storage-route.type";
import type { ObjectStorageServiceCopyReturn } from "./object-storage-service.type";

import CaughtError from "../../utils/Caught-Error.util";
import generateId from "../../utils/generate-id.util";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import fsAsync from "node:fs/promises";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";

import { serverConfigs } from "../..";

export default async function copy(user: User, body: ObjectStorageCopyReqBody): Promise<ObjectStorageServiceCopyReturn> {
  const items: Record<string, StorageObject> = body.items;
  const itemCopies: StorageObject[] = [];
  const parent: StorageObject | undefined = await objectStorageRepo.getById(body.parentId);

  if(!parent) {
    throw new CaughtError(
      HTTP_ERROR_CODES.BAD_REQUEST,
      `${user.id} has tried to copy items into not existing directory`,
      "You can not copy items into not existing directory!"
    );
  }

  for(let name in items) {
    const item: StorageObject = items[name];
    const id: string = generateId();
    const isExist: boolean = !!(await objectStorageRepo.getOne({ parent_id: parent.id, name: item.name }));
    const originalPath: string = `${serverConfigs.BASE_USERS_PATH}/${user.id}/${item.id}`;
    const copyPath: string = `${serverConfigs.BASE_USERS_PATH}/${user.id}/${id}`;
    const itemCopy: StorageObject = {
      ...item,
      id,
      parent_id: body.parentId
    };

    if(isExist) {
      throw new CaughtError(
        HTTP_ERROR_CODES.CONFLICT,
        `${user.id} has tried to copy item ${item.name} that already exist in ${parent.id} directory`,
        "Item with the same name already exist!"
      );
    }

    await objectStorageRepo.insertOne(itemCopy);
    await fsAsync.cp(originalPath, copyPath);

    itemCopies.push(itemCopy);
  }

  return itemCopies;
};
