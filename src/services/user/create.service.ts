import type { User } from "../../index.type";
import type { UserLogUpReqBody } from "../../routes/user/user.type";

import generateArgon2iHash from "../../utils/argon2.util";
import generateId from "../../utils/generate-id.util";
import { generateAccessToken } from "../../utils/jwt.util";

import userRepo from "../../repos/User.repo";

export default async function create(data: UserLogUpReqBody): Promise<string> {
  const hash: string = generateArgon2iHash(data.password);
  const id: string = generateId();
  const token: string = generateAccessToken({ id });
  const user: User = {
    id,
    token,
    password: hash,
    email: data.email
  };
  
  await userRepo.insert<User>(user);

  return token;
};
