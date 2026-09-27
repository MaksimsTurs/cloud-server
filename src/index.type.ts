export type User = {
  id: string
  password: string
  email: string
  is_verified: boolean
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
  is_root: boolean
  parent_id?: string
  mime_type?: string
  name: string
  type: number
};

export type StorageObjectProcessOptions = {
  name?: string
  convertTo?: string
  quality?: number
  width?: number
  height?: number
};
