import type { User, UserTokens } from "../../index.type";

export type UserServiceCreateReturn = {
  tokens: UserTokens
  data: User
  dirPath: string
};

//###################################################

export type UserServiceVerifyReturn = {
  user: User
  tokens: UserTokens
};
