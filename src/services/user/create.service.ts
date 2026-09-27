import type { User } from "../../index.type";
import type { UserServiceCreateReturn } from "./user-service.type";
import type { UserLogUpReqBody } from "../../routes/user/user-route.type";

import argon from "argon2";

import generateId from "../../utils/generate-id.util";
import { HTTP409Error } from "../../utils/HTTP-Error.util";
import { generateRefreshToken, generateAccessToken } from "../../utils/jwt/jwt.util";

import userRepo from "../../repos/User.repo";

export default async function create(body: UserLogUpReqBody): Promise<UserServiceCreateReturn> {
  if(await userRepo.isExist({ email: body.email })) {
    throw new HTTP409Error(
      "Unknown user has tried to create account with email that already exists",
      "User already exist!"
    );
  }

  const id: string = generateId();
  const hash: string = await argon.hash(body.password);
  const accessToken: string = generateAccessToken({ id });
  const refreshToken: string = generateRefreshToken({ id });
  const user: User = {
    id,
    password: hash,
    email: body.email,
    is_verified: false
  };

  return {
    user,
    tokens: { access: accessToken, refresh: refreshToken }
  };
};
