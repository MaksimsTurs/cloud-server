import type { Response, Request } from "express";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function removeMe(
  _req: Request,
  res: Response
): Promise<void> {
  await userService.removeMe(res.locals.user);
  res
    .clearCookie(COOKIE.ACCESS_TOKEN_KEY, COOKIE.ACCESS_OPTIONS)
    .clearCookie(COOKIE.REFRESH_TOKEN_KEY, COOKIE.REFRESH_OPTIONS)
    .sendStatus(200)
};
