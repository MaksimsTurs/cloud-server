import type { CookieOptions } from "express";

export default {
  ACCESS_TOKEN_KEY: "LCLOUD_ACCESS_TOKEN",
  REFRESH_TOKEN_KEY: "LCLOUD_REFRESH_TOKEN",
  OPTIONS: {
    httpOnly: true,
    maxAge: 604_800_000,
    path: "/",
    sameSite: "lax",
  } as CookieOptions
} as const;
