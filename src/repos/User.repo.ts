import BaseRepository from "./Base.repo";

class UserRepository extends BaseRepository {
  constructor() {
    super("t_users");
  };
};

export default new UserRepository();
