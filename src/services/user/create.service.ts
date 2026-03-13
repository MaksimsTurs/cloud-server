import type { User, UserTokens } from "../../index.type";
import type { UserServiceCreateReturn } from "./user-service.type";
import type { UserLogUpReqBody } from "../../routes/user/user-route.type";

import CaughtError from "../../utils/Caught-Error.util";
import generateId from "../../utils/generate-id.util";

import userRepo from "../../repos/User.repo";

import userService from "./user.service";

import argon2 from "argon2";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import { serverConfigs } from "../../index";

export default async function create(data: UserLogUpReqBody): Promise<UserServiceCreateReturn> {
  if(await userRepo.isExist("email", data.email)) {
    throw new CaughtError({
      server: {
        message: "Unknown user has tried to create account with email that alredy exist"
      },
      client: HTTP_ERRORS.CONFLICT("User with the same email exist!")
    });
  }

  const hash: string = await argon2.hash(data.password);
  const id: string = generateId();
  const tokens: UserTokens = userService.generateTokens(id);
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
    tokens
  };
};
