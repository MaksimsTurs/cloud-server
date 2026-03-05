import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageMoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type.ts";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function move(user: User, body: ObjectStorageMoveObjectsReqBody): Promise<void> {
  const items: Record<string, StorageObject> = body.items;
  const parent: StorageObject | undefined = await objectStorageRepo.getById(body.parentId);

  if(!parent) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to move items into not existing directory!`
      },
      client: HTTP_ERRORS.BAD_REQUEST("You can not move items into not existing directory!")
    });
  }

  for(let name in items) {
    const item: StorageObject = items[name];
    const isExist: boolean = !!(await objectStorageRepo.getOne({ parent_id: parent.id, name: item.name }));

    if(isExist) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to move item (${item.name}) that already exist in ${parent.id} directory`
        },
        client: HTTP_ERRORS.CONFLICT("Item with the same name already exist!")
      });
    }

    await objectStorageRepo.updateById(item.id, { parent_id: parent.id });
  } 
};
