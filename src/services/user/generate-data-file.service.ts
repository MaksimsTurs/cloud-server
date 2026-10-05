import type { User } from "../../index.type";

import fsAsync from "node:fs/promises";

import app from "../../Application";

export default async function generateDataFile(user: User): Promise<string> {
  const { conf } = app.context;
  const dstPath: string = `${conf.BASE_STORAGE_PATH}/${user.id}/data.json`;
  
  await fsAsync.writeFile(dstPath, JSON.stringify(user));

  return dstPath;
};
