import type { Request, Response } from "express";
import type { UserLogUpReqBody, UserLogUpResBody } from "./user-route.type";
import type { UserServiceCreateReturn } from "../../services/user/user-service.type";
import type { StorageObject } from "../../index.type";

import COOKIE from "../../const/COOKIE.const";
import DIR_ITEM_TYPES from "../../const/DIR-ITEM-TYPES.const.ts";

import userService from "../../services/user/user.service";
import objectStorageService from "../../services/object-storage/object-storage.service.ts"

export default async function logup(
  req: Request<unknown, unknown, UserLogUpReqBody>, 
  res: Response<UserLogUpResBody, any>
): Promise<void> {
  const user: UserServiceCreateReturn = await userService.create(req.body);
  const storageObject: StorageObject = await objectStorageService.create({
    id: user.data.id,
    name: "root",
    type: DIR_ITEM_TYPES.DIR,
    user_id: user.data.id,
  });

  await userService.save(user);
  await objectStorageService.save(storageObject);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, user.tokens.access, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, user.tokens.refresh, COOKIE.REFRESH_OPTIONS);
  res.status(200).send({ tokens: user.tokens });
};
