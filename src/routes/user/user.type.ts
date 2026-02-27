export type InitUserLocals = {
  userId: string
};

export type InitUserResBody = {
  user: string
  tokens: {
    access: string
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
  user: string
  tokens: {
    access: string
  }
};
