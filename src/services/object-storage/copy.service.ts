import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageCopyReqBody } from "../../routes/object-storage/object-storage-route.type";

import CaughtError from "../../utils/Caught-Error.util";
import generateId from "../../utils/generate-id.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import objectStorageRepo from "../../repos/Object-Storage.repo";

export default async function copy(user: User, body: ObjectStorageCopyReqBody): Promise<void> {
  const items: Record<string, StorageObject> = body.items;
  const parent: StorageObject | undefined = await objectStorageRepo.getById(body.parentId);

  if(!parent) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to copy items into not existing directory`
      },
      client: HTTP_ERRORS.BAD_REQUEST("You can not copy items into not existing directory!")
    });
  }

  for(let name in items) {
    const item: StorageObject = items[name];
    const id: string = generateId();
    const isExist: boolean = !!(await objectStorageRepo.getOne({ parent_id: parent.id, name: item.name }));

    if(isExist) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to copy item ${item.name} that already exist in ${parent.id} directory`
        },
        client: HTTP_ERRORS.CONFLICT(`Item with the same name already exist!`)
      });
    }

    await objectStorageRepo.insertOne({...item, id, parent_id: body.parentId });
  }
};
