import type { Request, Response } from "express";
import type { ObjectStorageCopyReqBody, ObjectStorageCopyResLocals } from "./object-storage-route.type";
import type { ObjectStorageServiceCopyReturn } from "../../services/object-storage/object-storage-service.type";

import objectStorageService from "../../services/object-storage/object-storage.service";

export default async function copy(
  req: Request<unknown, unknown, ObjectStorageCopyReqBody>, 
  res: Response<ObjectStorageServiceCopyReturn, ObjectStorageCopyResLocals>
): Promise<void> {
  const obejctStorageCopy: ObjectStorageServiceCopyReturn = await objectStorageService.copy(res.locals.user, req.body);

  res.status(200).send(obejctStorageCopy);
};
