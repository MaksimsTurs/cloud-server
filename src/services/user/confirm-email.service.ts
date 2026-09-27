import type { UserJwtPayload } from "../../index.type";
import type { JwtTokenPaylaod } from "../../utils/jwt/jwt.type";

import { verifyEmailConfirmToken } from "../../utils/jwt/jwt.util";
import { HTTP400Error } from "../../utils/HTTP-Error.util";

import userRepo from "../../repos/User.repo";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default async function confirmEmail(token: string): Promise<void> {
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyEmailConfirmToken<UserJwtPayload>(token);
  
  if(!payload || !payload?.id) {
    throw new HTTP400Error(
      "Unknown user has tried to confirm email",
      "Something is wrong, contact our customer Support!"
    );
  }

  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME, payload);
  await VALIDATION_SCHEMES.validate(VALIDATION_SCHEMES.UUID_SHEME, payload.id);

  await userRepo.updateById(payload.id, { is_verified: true });
};
