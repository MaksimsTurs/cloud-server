import type { Request, Response } from "express";
import type { StorageObject, User } from "../../index.type";
import type { CreateStorageObjectResLocals, CreateStorageObjectReqBody } from "./dir.type";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/dir/dir.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function create(
  req: Request<unknown, unknown, CreateStorageObjectReqBody>,
  res: Response<StorageObject, CreateStorageObjectResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to create new directory`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to create new directory!")
    });
  }

  const storageObject: StorageObject = await objectStorageService.create(user, req.body);
  
  res.status(200).send(storageObject);
};
