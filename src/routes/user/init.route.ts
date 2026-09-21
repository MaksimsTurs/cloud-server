import type { Request, Response } from "express";
import type { UserInitResBody, UserInitResLocals } from "./user-route.type";

import COOKIE from "../../const/COOKIE.const";

export default async function init(
  req: Request, 
  res: Response<UserInitResBody, UserInitResLocals>
): Promise<void> {
  res.status(200).send({
    tokens: {
      access: req.cookies[COOKIE.ACCESS_TOKEN_KEY],
      refresh: req.cookies[COOKIE.REFRESH_TOKEN_KEY]
    },
    user: {
      is_verified: res.locals.user.is_verified
    }
  });
};
