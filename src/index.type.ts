export type User = {
  id: string
  password: string
  email: string
};

export type UserTokens = {
  access: string
  refresh: string
};

export type UserJwtPayload = {
  id: string
};

export type StorageObject = {
  id: string
  user_id: string
  parent_id?: string
  name: string
  type: number
};
