import type { UserJwtPayload } from "../../index.type";
import type { UserResetPasswordBody } from "../../routes/user/user-route.type";
import type { JwtTokenPaylaod } from "../../utils/jwt/jwt.type";

import CaughtError from "../../utils/Caught-Error.util";

import userRepo from "../../repos/User.repo";

import argon from "argon2";

import { verifyResetPasswordToken } from "../../utils/jwt/jwt.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function resetPassword(body: UserResetPasswordBody): Promise<void> {
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyResetPasswordToken<UserJwtPayload>(body.token);

  if(!payload) {
    throw new CaughtError({
      server: {
        message: `Unknown user has tried to reset password`
      },
      client: HTTP_ERRORS.FORBIDDEN("Token is not valid!")
    });
  }

  const hash: string = await argon.hash(body.password);
  
  await userRepo.updateById(payload.id, { password: hash });
};
