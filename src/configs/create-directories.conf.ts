import type { ApplicationConf } from "../Application.type";

import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

export default async function createDirectories(conf: ApplicationConf): Promise<void> {
  if(!existsSync(conf.BASE_STORAGE_PATH)) {
    await mkdir(conf.BASE_STORAGE_PATH);
  }

  if(!existsSync(conf.BASE_TMP_PATH)) {
    await mkdir(conf.BASE_TMP_PATH);
  }
};
