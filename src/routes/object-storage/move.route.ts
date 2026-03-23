import type { Request, Response } from "express";
import type { ObjectStorageMoveObjectsReqBody, ObjectStorageMoveObjectsResLocals } from "./object-storage-route.type";

import objectStorageService from "../../services/object-storage/object-storage.service";

export default async function move(
  req: Request<unknown, unknown, ObjectStorageMoveObjectsReqBody>, 
  res: Response<unknown, ObjectStorageMoveObjectsResLocals>
): Promise<void> {
  await objectStorageService.move(res.locals.user, req.body);

  res.sendStatus(200);
};
