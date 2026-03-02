import type { StorageObject, User } from "../../index.type";
import type { GetAllStorageObjects } from "./object-storage.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function getAllObjects(user: User, id?: string): Promise<GetAllStorageObjects> {
  let parentId: string = id || user.id;
  let items: StorageObject[] = [];
  let parent: StorageObject | undefined;

  items = await objectStorageRepo.getAllObjects(user.id, parentId);
  parent = items.at(0);

  if(!parent || parent.id !== parentId) {
    throw new CaughtError({
      server: {
        message: `Can not fin parent directory with id ${parentId}`
      },
      client: HTTP_ERRORS.NOT_FOUND("Can not find this directory!")
    });
  }

  return {
    items: items.slice(1, items.length),
    parent
  };
};
