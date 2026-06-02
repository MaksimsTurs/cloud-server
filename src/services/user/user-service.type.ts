import type { User, UserTokens } from "../../index.type";

export type UserServiceCreateReturn = {
  tokens: UserTokens
  user: User
  workDir: string
};

export type UserServiceInitReturn = {
  accessToken: string
  refreshToken: string
  is_verified: boolean
};
