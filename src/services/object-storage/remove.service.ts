import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageRemoveObjectsReqBody } from "../../routes/object-storage/object-storage-route.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import fsAsync from "node:fs/promises";

import CaughtError from "../../utils/Caught-Error.util";
import { isPathSafe } from "../../utils/is.util";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";
import DIR_ITEM_TYPES from "../../const/DIR-ITEM-TYPES.const";

import { serverConfigs } from "../..";

export default async function remove(user: User, body: ObjectStorageRemoveObjectsReqBody): Promise<void> {
  for(let name in body) {
    const item: StorageObject = body[name];
    const itemPath: string = `${serverConfigs.BASE_USERS_PATH}/${item.user_id}/${item.id}`;

    if(item.user_id != user.id) {
      throw new CaughtError(
        HTTP_ERROR_CODES.FORBIDDEN,
        `User ${user.id} has tried to remove another user's directory ${item.id}`,
        "You can not remove this directory!"
      );
    }

    if(!isPathSafe(serverConfigs.BASE_USERS_PATH, itemPath)) {
      throw new CaughtError(
        HTTP_ERROR_CODES.BAD_REQUEST,
        `User ${user.id} has tried to remove suspicous item ${itemPath}`,
        "You can not remove this item!"
      );
    }

    if(item.type === DIR_ITEM_TYPES.FILE) {
      await fsAsync.rm(itemPath);
    }

    await objectStorageRepo.removeOne("id", item.id);
  }
};
