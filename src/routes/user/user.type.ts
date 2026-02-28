export type InitUserLocals = {
  userId: string
};

export type InitUserResBody = {
  tokens: {
    access: string
    refresh: string
  }
};

export type UserLogUpReqBody = {
  email: string
  password: string
  confirmPassword: string
};

export type UserLogUpResBody = {
  tokens: {
    access: string
    refresh: string
  }
};

export type UserLogOutResLocals = {
  userId: string
};

export type UserLogInReqBody = {
  email: string
  password: string
};

export type UserLogInResBody = {
  tokens: {
    access: string
    refresh: string
  }
};
