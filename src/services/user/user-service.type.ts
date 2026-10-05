import type { StorageObject, User, UserTokens } from "../../index.type";

export type UserServiceCreateReturn = {
  tokens: UserTokens
  user: User
};

export type UserServiceLogUpReturn = {
  user: User
  tokens: UserTokens
  root: StorageObject
};
