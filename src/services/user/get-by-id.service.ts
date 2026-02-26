import type { User } from "../../index.type";

import userRepo from "../../repos/User.repo";

export default async function getById(id: string): Promise<User | undefined> {
  return userRepo.getById(id);
};
