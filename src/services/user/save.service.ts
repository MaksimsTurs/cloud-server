import type { UserServiceCreateReturn } from "./user-service.type";

import fsAsync from "fs/promises";

import userRepo from "../../repos/User.repo";

export default async function save(user: UserServiceCreateReturn): Promise<void> {
  await fsAsync.mkdir(user.dirPath);
  await userRepo.insertOne(user.data);
};
