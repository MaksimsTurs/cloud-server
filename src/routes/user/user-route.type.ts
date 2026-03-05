import type { UserTokens } from "../../index.type";

export type UserLogUpReqBody = {
  email: string
  password: string
  confirmPassword: string
};

export type UserLogUpResBody = {
  tokens: UserTokens 
};

//#########################################################

export type UserLogInReqBody = {
  email: string
  password: string
};

export type UserLogInResBody = {
  tokens: UserTokens
};

//#########################################################

export type UserLogOutResLocals = {
  userId: string
};

//#########################################################

export type UserRefreshTokenResLocals = {
  userId: string
};

//#########################################################

export type InitUserResBody = {
  tokens: UserTokens
};
