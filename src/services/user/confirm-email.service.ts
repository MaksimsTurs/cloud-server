import type { UserJwtPayload } from "../../index.type";
import type { JwtTokenPaylaod } from "../../utils/jwt/jwt.type";

import { verifyEmailConformationToken } from "../../utils/jwt/jwt.util";
import CaughtError from "../../utils/Caught-Error.util";

import userRepo from "../../repos/User.repo";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

export default async function confirmEmail(token: string): Promise<void> {
  const payload: JwtTokenPaylaod<UserJwtPayload> | undefined = verifyEmailConformationToken<UserJwtPayload>(token);

  if(!payload) {
    throw new CaughtError({
      client: HTTP_ERRORS.BAD_REQUEST("You confirmation token is not valid!")
    });
  }

  await userRepo.updateById(payload.id, { is_verified: true });
};
