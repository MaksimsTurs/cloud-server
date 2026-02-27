import type { BlacklistedJwt } from "../index.type";

import SQLRepository from "./SQL.repo";

class JwtBlackListRepository extends SQLRepository<BlacklistedJwt> {
  constructor() {
    super("t_jwt_blacklist");
  };
};

export default new JwtBlackListRepository();
