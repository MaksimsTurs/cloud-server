import type { User } from "../index.type";

import BaseRepository from "./Base.repo";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super("t_users");
  };
};

export default new UserRepository();
