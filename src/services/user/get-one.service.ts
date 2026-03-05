import type { User } from "../../index.type";

import userRepo from "../../repos/User.repo";

export default async function getOne(data: Partial<User>): Promise<User | undefined> {
  return await userRepo.getOne(data);
};
