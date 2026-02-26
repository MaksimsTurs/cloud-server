import type { DirItem } from "../../index.type";

export type ReadDirResLocals = {
  userId: string
};

export type ReadDirReqQueries = {
  dir: string
};

export type ReadDirResBody = DirItem[];

export type CopyDirResLocals = {
  userId: string
};

export type CopyDirReqBody = {
  from: string
  into: string
  items: string[]
};

export type MoveDirResLocals = {
  userId: string
};

export type MoveDirReqBody = {
  from: string
  into: string
  items: string[]
};
