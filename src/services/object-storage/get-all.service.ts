import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageServiceGetAllReturn } from "./object-storage-service.type"

import storageRepo from "../../repos/Object-Storage.repo";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";

export default async function getAll(user: User, id?: string): Promise<ObjectStorageServiceGetAllReturn> {
  let parentId: string = id || user.id;
  let items: StorageObject[] = [];
  let parent: StorageObject | undefined;

  items = await storageRepo.getAll(user.id, parentId);
  parent = items.at(0);

  if(!parent || parent.id !== parentId) {
    throw new CaughtError(
      HTTP_ERROR_CODES.NOT_FOUND,
      `Can not find directory with id ${parentId}`,
      "Can not find directory!"
    );
  }

  return { 
    items: items.slice(1, items.length), 
    parent 
  };
};
