import type { UserServiceCreateReturn } from "./user-service.type";

import fsAsync from "node:fs/promises";

import userRepo from "../../repos/User.repo";

import app from "../../Application";

export default async function save(data: UserServiceCreateReturn): Promise<void> {
  const { conf } = app.context;
  await fsAsync.mkdir(`${conf.BASE_STORAGE_PATH}/${data.user.id}`);
  await userRepo.insertOne(data.user);
};
