import type { Request, Response } from "express";
import type { StorageObject, User } from "../../index.type";
import type { ObjectStorageGetObjectReqParams, ObjectStorageGetObjectResLocals } from "./object-storage-route.type";

import CaughtError from "../../utils/Caught-Error.util";

import objectStorageService from "../../services/object-storage/object-storage.service";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import path from "node:path";
import fsAsync from "fs/promises";

import userService from "../../services/user/user.service";

import { serverConfigs } from "../../index";

export default async function getById(
  req: Request<ObjectStorageGetObjectReqParams>, 
  res: Response<unknown, ObjectStorageGetObjectResLocals>
): Promise<void> {
  const storageObject: StorageObject | undefined = await objectStorageService.getById(req.params.id);

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

  const filePath: string = path.resolve(serverConfigs.BASE_USERS_PATH, user.id, storageObject!.id);
  const buffer = await fsAsync.readFile(filePath, { encoding: "utf8" });

  res.status(200).send({...storageObject, buffer });
};
