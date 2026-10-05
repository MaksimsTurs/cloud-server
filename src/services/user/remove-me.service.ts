import type { User } from "../../index.type";

import userRepo from "../../repos/User.repo";
import objectStorageRepo from "../../repos/Object-Storage.repo";

import app from "../../Application";

import fsAsync from "node:fs/promises";

export default async function removeMe(user: User): Promise<void> {
  const { conf } = app.context;
  const path: string = `${conf.BASE_STORAGE_PATH}/${user.id}`;

  await objectStorageRepo.removeMany({ user_id: user.id });
  await userRepo.removeById(user.id);
  await fsAsync.rm(path, { recursive: true, force: true });
};
