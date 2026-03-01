export type User = {
  id: string
  password: string
  email: string
};

export type FileObject = {
  id: string
  parent_id: string
  user_id: string
  name: string
};

export type DirObject = {
  id: string
  parent_id: string
  user_id: string
  name: string
};

export type UserTokens = {
  accessToken: string
  refreshToken: string
};

export type BlacklistedJwt = {
  token: string
};

export type JwtAuthPayload = {
  id: string
};

export type DirItem = {
  type: number
  path: string
  name: string
  // Dir only properties
  items?: DirItem[]
  // File only properties
  buffer?: string
  size?: number
  extention?: string
};
