import type { Request, Response } from "express";
import type { UserGetMeResBody, UserGetMeResLocals } from "./user-route.type";
import type { StorageObject } from "../../index.type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import { HTTP404Error } from "../../utils/HTTP-Error.util";

import COOKIE from "../../const/COOKIE.const";

export default async function getMe(
  req: Request, 
  res: Response<UserGetMeResBody, UserGetMeResLocals>
): Promise<void> {
  const { user } = res.locals;
  const root: StorageObject | undefined = await objectStorageRepo.getOne({ user_id: user.id, is_root: true });
  
  if(!root) {
    throw new HTTP404Error(
      `User ${user.id} has no root directory`,
      "Something is wrong, contact our customer Support!"
    );
  }

  res
    .status(200)
    .send({
      tokens: {
        access: req.cookies[COOKIE.ACCESS_TOKEN_KEY],
        refresh: req.cookies[COOKIE.REFRESH_TOKEN_KEY]
      },
      user: {
        is_verified: res.locals.user.is_verified,
        root_id: root.id
      }
    });
};
