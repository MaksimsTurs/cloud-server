import type { Request, Response } from "express";
import type { ObjectStorageRemoveObjectsReqBody, ObjectStorageRemoveObjectsResLocals } from "./object-storage-route.type";

import objectStorageService from "../../services/object-storage/object-storage.service";

export default async function remove(
  req: Request<unknown, unknown, ObjectStorageRemoveObjectsReqBody>,
  res: Response<unknown, ObjectStorageRemoveObjectsResLocals>
): Promise<void> {
  await objectStorageService.remove(res.locals.user, req.body);

  res.sendStatus(200);
};
