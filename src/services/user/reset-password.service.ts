import type { UserJwtPayload } from "../../index.type";
import type { UserResetPasswordBody } from "../../routes/user/user-route.type";
import type { JwtTokenPaylaod } from "../../utils/jwt/jwt.type";

import CaughtError from "../../utils/Caught-Error.util";
import { verifyResetPasswordToken } from "../../utils/jwt/jwt.util";

import userRepo from "../../repos/User.repo";

import argon from "argon2";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";
import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default async function resetPassword(body: UserResetPasswordBody): Promise<void> {
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyResetPasswordToken<UserJwtPayload>(body.token);

  if(!payload || payload.id) {
    throw new CaughtError(
      HTTP_ERROR_CODES.BAD_REQUEST,
      "Unknown user has tried to reset password",
      "Token is not valid!"
    );
  }

  VALIDATION_SCHEMES.create(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME).validate(payload);
  VALIDATION_SCHEMES.create(VALIDATION_SCHEMES.UUID_SHEME).validate(payload.id);

  const hash: string = await argon.hash(body.password);
  
  await userRepo.updateById(payload.id, { password: hash });
};
