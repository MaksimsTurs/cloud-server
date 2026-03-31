import type { User } from "../../index.type";
import type { UserServiceCreateReturn } from "./user-service.type";
import type { UserLogUpReqBody } from "../../routes/user/user-route.type";

import CaughtError from "../../utils/Caught-Error.util";
import generateId from "../../utils/generate-id.util";
import { generateRefreshToken, generateAccessToken } from "../../utils/jwt/jwt.util";

import userRepo from "../../repos/User.repo";

import argon from "argon2";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";

import { serverConfigs } from "../../index";

export default async function create(data: UserLogUpReqBody): Promise<UserServiceCreateReturn> {
  if(await userRepo.isExist("email", data.email)) {
    throw new CaughtError(
      HTTP_ERROR_CODES.CONFLICT,
      "Unknown user has tried to create account with email that alredy exist",
      "User with the same email alredy exist!"
    );
  }

  const id: string = generateId();
  const hash: string = await argon.hash(data.password);
  const access: string = generateAccessToken({ id });
  const refresh: string = generateRefreshToken({ id });
  const workDir: string = `${serverConfigs.BASE_USERS_PATH}/${id}`;
  const user: User = {
    id,
    password: hash,
    email: data.email,
    is_verified: false
  };

  return {
    user,
    workDir,
    tokens: { access, refresh }
  };
};
