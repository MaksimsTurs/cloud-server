import type { User, UserTokens, UserJwtPayload } from "../../index.type";

import { generateRefreshToken, verifyAccessToken } from "../../utils/jwt/jwt.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import COOKIE from "../../const/COOKIE.const";

import userRepo from "../../repos/User.repo";

export default async function init(cookies: Record<string, string>): Promise<UserTokens> {
  const accessToken: string = cookies[COOKIE.ACCESS_TOKEN_KEY];
  const token = verifyAccessToken<UserJwtPayload>(accessToken);
  
  if(!token) {
    throw new CaughtError({
      server: {
        message: "Unauthenticated user has tried to authorize"
      },
      client: HTTP_ERRORS.BAD_REQUEST("Unauthenticated!")
    });
  }

  const user: User | undefined = await userRepo.getById(token.id);

  if(!user) {
    throw new CaughtError({
      server: {
        message: `User with suspicius access token ${accessToken} has tried to get user`
      },
      client: HTTP_ERRORS.BAD_REQUEST("Unauthenticated!")
    });
  }

  const refreshToken: string = generateRefreshToken({ id: user.id });

  return { access: accessToken, refresh: refreshToken };
};
