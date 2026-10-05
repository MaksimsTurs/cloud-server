import type { Request, Response } from "express";
import type { UserDownloadMyDataResLocals } from "./user-route.type";

import userService from "../../services/user/user.service";

import fsAsync from "node:fs/promises";

export default async function downloadMyData(
  _req: Request,
  res: Response<unknown, UserDownloadMyDataResLocals>
): Promise<void> {
  const path: string = await userService.generateDataFile(res.locals.user);
  res.status(200).download(path);
  await fsAsync.rm(path, { force: true });
};
