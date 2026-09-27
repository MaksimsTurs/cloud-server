import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageCopyReqBody } from "../../routes/object-storage/object-storage-route.type";
import type { ObjectStorageServiceCopyReturn } from "./object-storage-service.type";

import { HTTP401Error, HTTP409Error } from "../../utils/HTTP-Error.util";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import fsAsync from "node:fs/promises";
import path from "node:path";

import app from "../../Application";

import objectStorageService from "./object-storage.service";

export default async function copy(user: User, body: ObjectStorageCopyReqBody): Promise<ObjectStorageServiceCopyReturn> {
  const { conf } = app.context;
  const items: Record<string, StorageObject> = body.items;
  const copies: StorageObject[] = [];
  const copiesParent: StorageObject | undefined = await objectStorageRepo.getById(body.parentId);

  if(!copiesParent) {
    throw new HTTP401Error(
      `User ${user.id} has tried to copy objects into not existing directory ${body.parentId}`,
      "You can not copy objects into not existing directory!"
    );
  }

  for(let id in items) {
    const item: StorageObject = items[id];
    
    if(!await objectStorageRepo.isExist({ id })) {
      throw new HTTP401Error(
        `User ${user.id} has tried to copy not existing item ${id}`,
        `${item.name} does not exist!`
      );
    }

    if(await objectStorageRepo.isExist({ parent_id: copiesParent.id, name: item.name })) {
      throw new HTTP409Error(
        `User ${user.id} has tried to copy object ${item.name} that already exist in directory ${copiesParent.id}`,
        "Object with the same name already exist!"
      );
    }

    const itemCopy: StorageObject = objectStorageService.create({...item, parent_id: body.parentId });
    const originalPath: string = path.resolve(`${conf.BASE_STORAGE_PATH}/${user.id}/${item.id}`);
    const copyPath: string = path.resolve(`${conf.BASE_STORAGE_PATH}/${user.id}/${itemCopy.id}`);

    await objectStorageRepo.insertOne(itemCopy);
    await fsAsync.cp(originalPath, copyPath);

    copies.push(itemCopy);
  }

  return copies;
};
