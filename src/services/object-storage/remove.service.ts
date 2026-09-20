import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageRemoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import fsAsync from "node:fs/promises";

import CaughtError from "../../utils/Caught-Error.util";
import bubleSort from "../../utils/buble-sort.util";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";
import STORAGE_OBJECT_TYPES from "../../const/STORAGE_OBJECT_TYPES.const";

import app from "../../Application";

export default async function remove(user: User, body: ObjectStorageRemoveObjectsReqBody): Promise<void> {
  const { conf } = app.context;
  const folders: StorageObject[] = [];

  for(let id in body) {
    const item: StorageObject = body[id];

    if(item.user_id != user.id) {
      throw new CaughtError(
        HTTP_ERROR_CODES.FORBIDDEN,
        `User(${user.id}) has tried to remove another user's items.`,
        "You cannot remove these items!"
      );
    }

    if(item.type === STORAGE_OBJECT_TYPES.DIR) {
      folders.push(item);
    } else {
      const itemPath: string = `${conf.BASE_STORAGE_PATH}/${item.user_id}/${item.id}`;

      await fsAsync.rm(itemPath);
      await objectStorageRepo.removeOne("id", item.id);
    }
  }
 
  bubleSort<StorageObject>(folders, (first: StorageObject, second: StorageObject) => first.id === second.parent_id);
  
  for(let index: number = 0; index < folders.length; index++) {
    await objectStorageRepo.removeOne("id", folders[index].id);
  }
};
