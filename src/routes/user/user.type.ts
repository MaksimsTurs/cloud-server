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
