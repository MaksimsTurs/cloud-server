import type { Request, Response } from "express";
import type { ObjectStorageServiceGetAllReturn } from "../../services/object-storage/object-storage-service.type";
import type {
  ObjectStorageGetAllReqBody,
  ObjectStorageGetAllResBody,
  ObjectStorageGetAllResLocals
} from "./object-storage-route.type";

import storageService from "../../services/object-storage/object-storage.service";

export default async function getAll(
  req: Request<unknown, unknown, ObjectStorageGetAllReqBody>, 
  res: Response<ObjectStorageGetAllResBody, ObjectStorageGetAllResLocals>
): Promise<void> {
  const storageObject: ObjectStorageServiceGetAllReturn = await storageService.getAll(res.locals.user, req.body.id);

  res.status(200).send(storageObject);
};
