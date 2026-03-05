import type { Request, Response } from "express";
import type { ObjectStorageCopyReqBody, ObjectStorageCopyResLocals } from "./object-storage-route.type";
import type { User } from "../../index.type";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/object-storage/object-storage.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function copy(
  req: Request<unknown, unknown, ObjectStorageCopyReqBody>, 
  res: Response<unknown, ObjectStorageCopyResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to copy directory items`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to copy items!")
    });
  }

  await objectStorageService.copy(user, req.body);

  res.sendStatus(200);
};
