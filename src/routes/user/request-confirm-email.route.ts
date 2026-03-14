import type { Request, Response } from "express";
import type { UserRequestConfirmEmailResLocals } from "./user-route.type.ts";

import userService from "../../services/user/user.service";

export default async function requestConfirmEmail(
  _req: Request, 
  res: Response<unknown, UserRequestConfirmEmailResLocals>
): Promise<void> {
  await userService.sendConfirmEmail(res.locals.user);

  res.sendStatus(200);
};
