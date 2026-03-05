import type { CookieOptions } from "express";

import { serverConfigs } from "..";

export default {
  ACCESS_TOKEN_KEY: "LCLOUD_ACCESS_TOKEN",
  REFRESH_TOKEN_KEY: "LCLOUD_REFRESH_TOKEN",
  REFRESH_OPTIONS: {
    httpOnly: true,
    maxAge: 900_000,
    path: "/",
    sameSite: "lax",
    secure: serverConfigs.MODE != "dev"
  } as CookieOptions,
  ACCESS_OPTIONS: {
    httpOnly: true,
    maxAge: 604_800_000,
    path: "/",
    sameSite: "lax",
    secure: serverConfigs.MODE != "dev"
  } as CookieOptions
} as const;
