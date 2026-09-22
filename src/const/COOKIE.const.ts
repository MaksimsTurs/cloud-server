import type { CookieOptions } from "express";

export default {
  ACCESS_TOKEN_KEY:   "$55959286437",
  REFRESH_TOKEN_KEY:  "$53879365562",
  REFRESH_OPTIONS: {
    maxAge: 604_800_000,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.MODE != "dev"
  } as CookieOptions,
  ACCESS_OPTIONS: {
    maxAge: 900_000,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.MODE != "dev"
  } as CookieOptions
} as const;
