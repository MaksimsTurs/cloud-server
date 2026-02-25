import type { Request, Response } from "express";
import type { UserLogUpReqBody, UserLogUpResBody } from "./user.type";

import userService from "../../services/user/user.service";

import COOKIE from "../../const/COOKIE.const";

export default async function logup(req: Request<unknown, unknown, UserLogUpReqBody>, res: Response<UserLogUpResBody, any>): Promise<void> {
  const accessToken: string = await userService.create(req.body);

  res.cookie(COOKIE.ACCESS_TOKEN_KEY, accessToken, COOKIE.OPTIONS);
  res.status(200).send({ tokens: { access: accessToken }});
};
