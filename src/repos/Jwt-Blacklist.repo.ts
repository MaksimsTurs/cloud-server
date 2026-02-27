import type { BlacklistedJwt } from "../index.type";

import BaseRepository from "./Base.repo";

class JwtBlackListRepository extends BaseRepository<BlacklistedJwt> {
  constructor() {
    super("t_jwt_blacklist");
  };
};

export default new JwtBlackListRepository();
