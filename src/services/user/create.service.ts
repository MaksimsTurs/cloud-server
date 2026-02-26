import type { User } from "../../index.type";
import type { UserLogUpReqBody } from "../../routes/user/user.type";

import CaughtError from "../../utils/Caught-Error.util";
import generateArgon2iHash from "../../utils/generate-argon2i-hash.util";
import generateId from "../../utils/generate-id.util";
import { generateAccessToken } from "../../utils/jwt/jwt.util";

import userRepo from "../../repos/User.repo";

import fsAsync from "node:fs/promises";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function create(data: UserLogUpReqBody): Promise<User> {
  if (await userRepo.isExist("email", data.email)) {
    throw new CaughtError({
      server: {
        message: "User with the same email try to create new account"
      },
      client: HTTP_ERRORS.CONFLICT("User with the same email exist!")
    });
  }

  const hash: string = generateArgon2iHash(data.password);
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
