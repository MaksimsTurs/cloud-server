import type { DirObject } from "../index.type";

import SQLRepository from "./SQL.repo";

class DirObjectRepository extends SQLRepository<DirObject> {
  constructor() {
    super("t_dir_objects");
  };
};

export default new DirObjectRepository();
