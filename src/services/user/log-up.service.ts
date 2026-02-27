import type { User } from "../../index.type";
import type { UserLogUpReqBody } from "../../routes/user/user.type";

import CaughtError from "../../utils/Caught-Error.util";
import generateId from "../../utils/generate-id.util";
import { generateAccessToken } from "../../utils/jwt/jwt.util";

import userRepo from "../../repos/User.repo";

import fsAsync from "node:fs/promises";
import argon2 from "argon2";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function create(data: UserLogUpReqBody): Promise<User> {
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
  const token: string = generateAccessToken({ id });
  const user: User = {
    id,
    token,
    password: hash,
    email: data.email,
    root_path: `${process.env.PROJECT_BASE_PATH}/${id}`
  };
  
  await fsAsync.mkdir(user.root_path);
  await userRepo.insert(user);

  return user;
};
