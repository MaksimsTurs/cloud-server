import type { User, UserTokens } from "../../index.type";

export type UserLogUpReqBody = {
  email: string
  password: string
  confirmPassword: string
};

export type UserLogUpResBody = {
  tokens: UserTokens
  user: {
    is_verified: boolean
  }
};

//#########################################################

export type UserConfirmQuery = {
  token: string
};

//#########################################################

export type UserLogInReqBody = {
  email: string
  password: string
};

export type UserLogInResBody = {
  tokens: UserTokens
  user: {
    is_verified: boolean
  }
};

//#########################################################

export type UserRefreshTokenResLocals = {
  user: {
    is_verified: boolean
  }
};

//#########################################################

export type UserInitResLocals = {
  user: User
};

export type UserInitResBody = {
  tokens: UserTokens
  user: {
    is_verified: boolean
  }
};

//#########################################################

export type UserRequestConfirmEmailResLocals = {
  user: User
};

//#########################################################

export type UserRequestResetPasswordReqBody = {
  token: string
  email: string
};

//#########################################################

export type UserResetPasswordBody = {
  token: string
  password: string
};
