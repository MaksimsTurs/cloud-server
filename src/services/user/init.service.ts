import type { User, UserJwtPayload } from "../../index.type";
import type { UserServiceInitReturn } from "./user-service.type";

import CaughtError from "../../utils/Caught-Error.util";
import userService from "./user.service";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt/jwt.util";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";
import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";

export default async function init(refreshToken?: string): Promise<UserServiceInitReturn> {
  if(!refreshToken) {
    throw new CaughtError(
      HTTP_ERROR_CODES.UNAUTHORIZED,
      `Unknown user with refresh token(${refreshToken}) has tried to initialize.`,
      "You are unauthorized!"
    );
  }

  const payload: UserJwtPayload | undefined = verifyRefreshToken(refreshToken);
  
  if(!payload || !payload?.id) {
    throw new CaughtError(
      HTTP_ERROR_CODES.UNAUTHORIZED,
      `User with suspicious id(${payload?.id}) has tried to initialize.`,
      "You are unauthorized!"
    );
  }

  VALIDATION_SCHEMES.create(VALIDATION_SCHEMES.JWT_USER_PAYLOAD_SCHEME).validate(payload);
  VALIDATION_SCHEMES.create(VALIDATION_SCHEMES.UUID_SHEME).validate(payload.id);
  
  const user: User | undefined = await userService.getById(payload.id);

  if(!user) {
    throw new CaughtError(
      HTTP_ERROR_CODES.NOT_FOUND,
      `User with unknown id(${payload.id}) has tried to initialize.`,
      "Can not find user!"
    );
  }

  const accessToken: string = generateAccessToken({ id: payload.id });

  return {
    accessToken,
    refreshToken,
    is_verified: user.is_verified
  };
};
