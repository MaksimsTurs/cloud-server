import type { FileObject } from "../index.type.ts";

import SQLRepository from "./SQL.repo";

class FileObjectRepository extends SQLRepository<FileObject> {
  constructor() {
    super("t_file_obejcts");
  };
};

export default new FileObjectRepository();
