import type { Request, Response } from "express";
import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageCreateItemReqBody, ObjectStorageCreateItemResLocals } from "./object-storage-route.type";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/object-storage/object-storage.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import DIRI_TEM_TYPES from "../../const/DIR-ITEM-TYPES.const";

export default async function create(
  req: Request<unknown, unknown, ObjectStorageCreateItemReqBody>,
  res: Response<StorageObject, ObjectStorageCreateItemResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to create new item`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to create new item!")
    });
  }

  //TODO Fix this
  //@ts-ignore
  const storageObject: StorageObject = await objectStorageService.create({
    user_id: user.id,
    type: DIRI_TEM_TYPES.DIR,
    name: req.body.name,
    parent_id: req.body.parentId,
  });
 
  await objectStorageService.save(storageObject);

  res.status(200).send(storageObject);
};
