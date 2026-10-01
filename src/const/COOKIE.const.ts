import type { CookieOptions } from "express";

export default {
  ACCESS_TOKEN_KEY:   "$55959286437",
  REFRESH_TOKEN_KEY:  "$53879365562",
  REFRESH_OPTIONS: {
    maxAge: 604_800_000,
    sameSite: "none",
    httpOnly: true,
    secure: process.env.NODE_ENV === "prod"
  } as CookieOptions,
  ACCESS_OPTIONS: {
    maxAge: 900_000,
    sameSite: "none",
    httpOnly: true,
    secure: process.env.NODE_ENV != "prod"
  } as CookieOptions
} as const;
