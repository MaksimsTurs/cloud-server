import type { User } from "../../index.type";

import userRepo from "../../repos/User.repo";

export default async function getBy(column: string, value: any): Promise<User | undefined> {
  return userRepo.getBy(column, value);
};
