import type { UserJwtPayload } from "../../index.type";
import type { JwtTokenPaylaod } from "../../utils/jwt/jwt.type";

import { verifyEmailConfirmToken } from "../../utils/jwt/jwt.util";
import CaughtError from "../../utils/Caught-Error.util";

import userRepo from "../../repos/User.repo";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function confirmEmail(token: string): Promise<void> {
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyEmailConfirmToken<UserJwtPayload>(token);
  
  if(!payload) {
    throw new CaughtError({
      server: {
        message: `Unknown user has tried to confirm email`
      },
      client: HTTP_ERRORS.BAD_REQUEST("You email confirm token is not valid!")
    });
  }

  await userRepo.updateById(payload.id, { is_verified: true });
};
