import type { CookieOptions } from "express";

export default {
  ACCESS_TOKEN_KEY: "--access-auth-token--",
  REFRESH_TOKEN_KEY: "--refresh-auth-token--",
  OPTIONS: {
    httpOnly: true,
    maxAge: 604800
  } as CookieOptions
} as const;
