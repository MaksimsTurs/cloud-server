import type { User, UserTokens } from "../../index.type";

export type UserServiceCreateReturn = {
  tokens: UserTokens
  user: User
  workDir: string
};

//###################################################
