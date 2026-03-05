import type { Request, Response } from "express";
import type { User } from "../../index.type";
import type { ObjectStorageServiceGetAllReturn } from "../../services/object-storage/object-storage-service.type";
import type {
  ObjectStorageGetAllReqBody,
  ObjectStorageGetAllResBody,
  ObjectStorageGetAllResLocals
} from "./object-storage-route.type";

import CaughtError from "../../utils/Caught-Error.util";

import userService from "../../services/user/user.service";
import storageService from "../../services/object-storage/object-storage.service";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function getAll(
  req: Request<unknown, unknown, ObjectStorageGetAllReqBody>, 
  res: Response<ObjectStorageGetAllResBody, ObjectStorageGetAllResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to get ${req.query.dir} directory items`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to read this directory!")
    });
  }

  const storageObject: ObjectStorageServiceGetAllReturn = await storageService.getAll(user, req.body.id);

  res.status(200).send(storageObject);
};
