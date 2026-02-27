import type { User } from "../../index.type";
import type { UserLogInReqBody } from "../../routes/user/user.type";

import { generateAccessToken } from "../../utils/jwt/jwt.util";
import CaughtError from "../../utils/Caught-Error.util";

import userRepo from "../../repos/User.repo";

import argon from "argon2";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function logIn(user: User, data: UserLogInReqBody): Promise<User> {
  const passwordsMatch: boolean = await argon.verify(user.password, data.password);
  
  if(!passwordsMatch) {
    throw new CaughtError({
      server: {
        message: `Unknown user has tried to log in as user ${user.id}`
      },
      client: HTTP_ERRORS.BAD_REQUEST("Password is not correct!")
    });
  }

  const token: string = generateAccessToken({ id: user.id });
  const updatedUser: User = {...user, token };

  await userRepo.updateById(user.id, { token });

  return updatedUser;
};
