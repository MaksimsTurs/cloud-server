export type User = {
  id: string
  token: string
  password: string
  email: string
  root_path: string
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
