import type { DirItem } from "../../index.type";

export type GetDirResLocals = {
  userId: string
};

export type GetDirReqQueries = {
  dir: string
};

export type GetDirResBody = DirItem[];
