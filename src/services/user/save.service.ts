import type { UserServiceCreateReturn } from "./user-service.type";

import fsAsync from "fs/promises";

import userRepo from "../../repos/User.repo";

export default async function save(data: UserServiceCreateReturn): Promise<void> {
  await fsAsync.mkdir(data.workDir);
  await userRepo.insertOne(data.user);
};
