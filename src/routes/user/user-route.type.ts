import type { User, UserTokens } from "../../index.type";

export type UserGetMeResLocals = {
  user: User
};

export type UserGetMeResBody = {
  tokens: UserTokens
  user: {
    is_verified: boolean
    root_id: string
  }
};

export type UserLogInReqBody = {
  pseudonym: string
  password: string
};

export type UserLogInResBody = {
  tokens: UserTokens
  user: {
    is_verified: boolean
    root_id: string
  }
};

export type UserLogUpReqBody = {
  pseudonym: string
  email: string
  password: string
  confirmPassword: string
};

export type UserLogUpResBody = {
  tokens: UserTokens
  user: {
    is_verified: boolean
    root_id: string
  }
};

export type UserResponseConfirmEmailLocals = {
  user: User
};

export type UserRequestConfirmEmailReqBody = {
  email: string
};

export type UserRequestResetPasswordReqBody = {
  pseudonym: string
  email: string
};

export type UserResetPasswordReqBody = {
  token: string
  password: string
};

export type UserConfirmEmailQuery = {
  token: string
};

export type UserDownloadMyDataResLocals = {
  user: User
};
