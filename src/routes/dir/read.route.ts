import type { Request, Response } from "express";
import type { GetAllStorageObjects } from "../../services/dir/object-storage.type";
import type { User } from "../../index.type";
import type { 
  GetStorageObjectsResLocals,
  GetStorageObjectsResBody,
  GetStorageObjectsReqBody,
} from "./dir.type";

import CaughtError from "../../utils/Caught-Error.util";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/dir/dir.service";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function read(
  req: Request<unknown, unknown, GetStorageObjectsReqBody>, 
  res: Response<GetStorageObjectsResBody, GetStorageObjectsResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);
  
  if(!user) {
    throw new CaughtError({
      server: {
        message: `Unknown user ${req.socket.remoteAddress} has tried to fetch ${req.query.dir} directory items`
      },
      client: HTTP_ERRORS.FORBIDDEN("You have no permission to read this directory!")
    });
  }

  const storageObject: GetAllStorageObjects = await objectStorageService.getAllObjects(user, req.body.id);

  res.status(200).send(storageObject);
};
