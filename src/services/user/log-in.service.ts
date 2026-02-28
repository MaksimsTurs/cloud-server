import type { User, UserTokens } from "../../index.type";
import type { UserLogInReqBody } from "../../routes/user/user.type";

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/jwt.util";
import CaughtError from "../../utils/Caught-Error.util";

import argon from "argon2";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function logIn(user: User, data: UserLogInReqBody): Promise<User & UserTokens> {
  const passwordsMatch: boolean = await argon.verify(user.password, data.password);
  
  if(!passwordsMatch) {
    throw new CaughtError({
      server: {
        message: `Unknown user has tried to log in as user ${user.id}`
      },
      client: HTTP_ERRORS.BAD_REQUEST("Password is not correct!")
    });
  }

  const accessToken: string = generateAccessToken({ id: user.id });
  const refreshToken: string = generateRefreshToken({ id: user.id });

  return {...user, accessToken, refreshToken };
};
