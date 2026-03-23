import type { Request, Response } from "express";
import type { StorageObject } from "../../index.type";
import type { ObjectStorageUploadReqBody, ObjectStorageUploadResLocals } from "./object-storage-route.type";

import dirService from "../../services/object-storage/object-storage.service";

export default async function upload(
  req: Request<unknown, unknown, ObjectStorageUploadReqBody>,
  res: Response<StorageObject[], ObjectStorageUploadResLocals>
): Promise<void> {
  let items: StorageObject[] = [];

  if(req.files) {
    items = await dirService.upload(res.locals.user, req.body, req.files as Express.Multer.File[]);
  }

  res.status(200).send(items);
};
