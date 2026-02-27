import type { User } from "../index.type";

import SQLRepository from "./SQL.repo";

class UserRepository extends SQLRepository<User> {
  constructor() {
    super("t_users");
  };
};

export default new UserRepository();
