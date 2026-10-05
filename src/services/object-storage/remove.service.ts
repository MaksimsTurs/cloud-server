import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageRemoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import fsAsync from "node:fs/promises";
import path from "node:path";

import { HTTP400Error } from "../../utils/HTTP-Error.util";
import bubleSort from "../../utils/buble-sort.util";
import SagaPattern from "../../utils/Saga-Pattern/Saga-Pattern.util";

import STORAGE_OBJECT_TYPES from "../../const/STORAGE_OBJECT_TYPES.const";

import app from "../../Application";

export default async function remove(user: User, body: ObjectStorageRemoveObjectsReqBody): Promise<void> {
  const { conf } = app.context;
  const folders: StorageObject[] = [];
  const saga: SagaPattern = new SagaPattern({ stepRetryCount: 1, compensateRetryCount: 2 });

  for(let id in body) {
    const item: StorageObject = body[id]!;

    if(item.user_id != user.id) {
      throw new HTTP400Error(
        `User ${user.id} has tried to remove another user's object`,
        "You cannot remove these object!"
      );
    }

    if(item.type === STORAGE_OBJECT_TYPES.DIR) {
      folders.push(item);
    } else {
      const itemPath: string = path.resolve(`${conf.BASE_STORAGE_PATH}/${item.user_id}/${item.id}`);

      (await saga
        .add(
          async (): Promise<void> => {
            await objectStorageRepo.removeById(item.id);
            await fsAsync.rm(itemPath);
          },
          async (): Promise<void> => {
            await objectStorageRepo.insertOne(item);
          }
        )
        .execute())
        .throw();
    }
  }
 
  bubleSort<StorageObject>(folders, (first: StorageObject, second: StorageObject) => first.id === second.parent_id);
  
  for(let index: number = 0; index < folders.length; index++) {
    await objectStorageRepo.removeById(folders[index]!.id);
  }
};
