import type { Request, Response } from "express";

import COOKIE from "../../const/COOKIE.const";

export default async function logOut(
  _req: Request,
  res: Response
): Promise<void> {
  res.clearCookie(COOKIE.ACCESS_TOKEN_KEY, COOKIE.ACCESS_OPTIONS);
  res.clearCookie(COOKIE.REFRESH_TOKEN_KEY, COOKIE.REFRESH_OPTIONS);
  res.sendStatus(200);
};
