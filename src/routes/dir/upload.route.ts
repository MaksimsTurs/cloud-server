import type { Request, Response } from "express";
import type { DirItem, User } from "../../index.type";
import type { UploadDirReqBody, UploadDirResLocals } from "./dir.type";

import userService from "../../services/user/user.service";
import dirService from "../../services/dir/dir.service";

import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function upload(
  req: Request<unknown, unknown, UploadDirReqBody>,
  res: Response<DirItem[], UploadDirResLocals>
): Promise<void> {
  const user: User | undefined = await userService.getById(res.locals.userId);

  let items: DirItem[] = [];

  if(!user) {
    throw new CaughtError({
      server: {
        message: `Undefined user try to upload files`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not upload files!")
    });
  }

  if(req.files) {
    items = await dirService.upload(user, req.body, req.files as Express.Multer.File[]);
  }

  res.status(200).send(items);
};
