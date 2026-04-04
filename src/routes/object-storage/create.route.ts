import type { Request, Response } from "express";
import type { StorageObject } from "../../index.type";
import type { ObjectStorageCreateItemReqBody, ObjectStorageCreateItemResLocals } from "./object-storage-route.type";

import objectStorageService from "../../services/object-storage/object-storage.service";

import STORAGE_OBJECT_TYPES from "../../const/STORAGE_OBJECT_TYPES.const";

export default async function create(
  req: Request<unknown, unknown, ObjectStorageCreateItemReqBody>,
  res: Response<StorageObject, ObjectStorageCreateItemResLocals>
): Promise<void> {
  const { user } = res.locals;
  const storageObject: StorageObject = await objectStorageService.create({
    user_id: user.id,
    type: STORAGE_OBJECT_TYPES.DIR,
    name: req.body.name,
    parent_id: req.body.parentId,
  });

  await objectStorageService.save(storageObject);

  res.status(200).send(storageObject);
};
