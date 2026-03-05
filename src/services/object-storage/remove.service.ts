import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageRemoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function remove(user: User, body: ObjectStorageRemoveObjectsReqBody): Promise<void> {
  for(let name in body) {
    const item: StorageObject = body[name];

    if(item.user_id != user.id) {
      throw new CaughtError({
        server: {
          message: `User ${user.id} has tried to remove another user's directory ${item.id} `
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not remove this directory!")
      });
    }

    await objectStorageRepo.removeOne("id", item.id);
  }
};
