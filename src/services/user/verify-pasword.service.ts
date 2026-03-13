import type { User } from "../../index.type";
import type { UserLogInReqBody } from "../../routes/user/user-route.type";

import CaughtError from "../../utils/Caught-Error.util";

import argon from "argon2";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";

import userRepo from "../../repos/User.repo";

export default async function verifyPassword(data: UserLogInReqBody): Promise<User> {
  const user: User | undefined = await userRepo.getOne({ email: data.email });
  
  if(!user) {
   throw new CaughtError({
      server: {
        message: "Unknown user has tried to log up with unknown email"
      },
      client: HTTP_ERRORS.NOT_FOUND("User with this email does not exist!")
    });
  }

  const passwordsMatch: boolean = await argon.verify(user.password, data.password);
  
  if(!passwordsMatch) {
    throw new CaughtError({
      server: {
        message: `${user.id} user has not pass the verification`
      },
      client: HTTP_ERRORS.BAD_REQUEST("Password is not correct!")
    });
  }

  return user;
};
