import type { Request, Response } from "express"; 
import type { ObjectStoragePreviewReqParams } from "./object-storage-route.type";
import type { StorageObject, User } from "../../index.type";

import { serverConfigs } from "../../index";

import path from "node:path";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import userService from "../../services/user/user.service";

export default async function preview(
  req: Request<ObjectStoragePreviewReqParams>,
  res: Response
): Promise<void> {
  const storageObject: StorageObject | undefined = await objectStorageRepo.getById(req.params.id);

  if(!storageObject) {
    new CaughtError({
      server: {
        message: `Can not find item with id ${req.body.id}`
      },
      client: HTTP_ERRORS.NOT_FOUND("Item not found!")
    });
  }


  const user: User | undefined = await userService.getById(storageObject!.user_id);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to get ${storageObject!.id} item`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to view this file!")
    });
  }

  res.sendFile(path.resolve(serverConfigs.BASE_USERS_PATH, user.id, storageObject!.id));
};
