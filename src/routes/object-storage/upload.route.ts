import type { Request, Response } from "express";
import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageUploadReqBody, ObjectStorageUploadResLocals } from "./object-storage-route.type";

import userService from "../../services/user/user.service";
import dirService from "../../services/object-storage/object-storage.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function upload(
  req: Request<unknown, unknown, ObjectStorageUploadReqBody>,
  res: Response<StorageObject[], ObjectStorageUploadResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  let items: StorageObject[] = [];

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to upload files`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to upload files!")
    });
  }

  if(req.files) {
    items = await dirService.upload(user, req.body.parentId, req.files as Express.Multer.File[]);
  }

  res.status(200).send(items);
};
