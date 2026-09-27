import type { Request, Response } from "express";
import type { StorageObject } from "../../index.type";
import type { UserLogUpResBody, UserLogUpReqBody } from "./user-route.type";
import type { UserServiceCreateReturn } from "../../services/user/user-service.type";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/object-storage/object-storage.service.ts"

import COOKIE from "../../const/COOKIE.const";
import STORAGE_OBJECT_TYPES from "../../const/STORAGE_OBJECT_TYPES.const.ts";

export default async function logUp(
  req: Request<unknown, unknown, UserLogUpReqBody>, 
  res: Response<UserLogUpResBody>
): Promise<void> {
  const data: UserServiceCreateReturn = await userService.create(req.body);
  const root: StorageObject = objectStorageService.create({
    user_id: data.user.id,
    name: "root",
    type: STORAGE_OBJECT_TYPES.DIR,
    is_root: true
  });

  await userService.sendConfirmEmail(data.user);
  await userService.save(data);
  await objectStorageService.save(root);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, data.tokens.access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, data.tokens.refresh, COOKIE.REFRESH_OPTIONS);
  res
    .status(200)
    .send({ 
      tokens: data.tokens,
      user: {
        is_verified: data.user.is_verified,
        root_id: root.id
      }
    });
};
