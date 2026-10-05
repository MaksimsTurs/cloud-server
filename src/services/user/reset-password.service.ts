import type { UserJwtPayload } from "../../index.type";
import type { UserResetPasswordReqBody } from "../../routes/user/user-route.type";
import type { JwtTokenPaylaod } from "../../utils/jwt/jwt.type";

import { HTTP400Error } from "../../utils/HTTP-Error.util";
import { verifyResetPasswordToken } from "../../utils/jwt/jwt.util";

import userRepo from "../../repos/User.repo";

import argon from "argon2";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default async function resetPassword(body: UserResetPasswordReqBody): Promise<void> {
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyResetPasswordToken<UserJwtPayload>(body.token);
  
  if(!payload) {
    throw new HTTP400Error(
      "Unknown user has tried to reset password",
      "Something is wrong, contact our customer Support!"
    );
  }

  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.COMMON.JWT_PAYLOAD, payload);
  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.COMMON.UUID, payload.id);

  const hash: string = await argon.hash(body.password);
  
  await userRepo.updateById(payload.id, { password: hash });
};
