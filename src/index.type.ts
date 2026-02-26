export type JwtAuthPayload = {
  id: string
};

export type User = {
  id: string
  token: string
  password: string
  email: string
  root_path: string
};
