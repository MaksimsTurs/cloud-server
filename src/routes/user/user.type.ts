export type UserAuthLocals = {
  userId: string
};

export type UserAuthResBody = {
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
