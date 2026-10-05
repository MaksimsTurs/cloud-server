import type { Request, Response } from "express";
import type { StorageObject, User } from "../../index.type";
import type { UserLogInReqBody, UserLogInResBody } from "./user-route.type";

import argon from "argon2";

import { HTTP401Error, HTTP404Error } from "../../utils/HTTP-Error.util";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/jwt.util";

import userService from "../../services/user/user.service";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import COOKIE from "../../const/COOKIE.const";

export default async function logIn(
  req: Request<unknown, unknown, UserLogInReqBody>,
  res: Response<UserLogInResBody>
): Promise<void> {
  const user: User | undefined = await userService.getOne({ pseudonym: req.body.pseudonym });
  
  if(!user) {
    throw new HTTP404Error(
      `Unknown user ${req.socket.remoteAddress} has tried to log in`,
      "User does not exist!"
    );
  }

  const match: boolean = await argon.verify(user.password, req.body.password);
  
  if(!match) {
    throw new HTTP401Error(
      `User ${user.id} has failed password verification`,
      "Password is not correct!"
    );
  }

  const accessToken: string = generateAccessToken({ id: user.id });
  const refreshToken: string = generateRefreshToken({ id: user.id });
  const root: StorageObject | undefined = await objectStorageRepo.getOne({ user_id: user.id, is_root: true });
  
  if(!root) {
    throw new HTTP404Error(
      `User ${user.id} has no root directory`,
      "Something is wrong, contact our customer Support!"
    );
  }

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, accessToken, COOKIE.ACCESS_OPTIONS);
  res.cookie(COOKIE.REFRESH_TOKEN_KEY, refreshToken, COOKIE.REFRESH_OPTIONS);
  res
    .status(200)
    .send({ 
      tokens: { 
        access: accessToken, 
        refresh: refreshToken 
      },
      user: {
        is_verified: user.is_verified,
        root_id: root.id
      }
    });
};
