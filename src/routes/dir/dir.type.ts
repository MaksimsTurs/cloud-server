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
  fromPath: string
  intoPath: string
  itemNames: string[]
};

export type MoveDirResLocals = {
  userId: string
};

export type MoveDirReqBody = {
  fromPath: string
  intoPath: string
  itemNames: string[]
};

export type RemoveDirLocals = {
  userId: string
};

export type RemoveDirReqBody = {
  fromPath: string
  itemNames: string[]
};

export type CreateDirLocals = {
  userId: string
};

export type CreateDirReqBody = {
  name: string
  inWhichPath: string
};

export type UploadDirResLocals = {
  userId: string
};

export type UploadDirReqBody = {
  uploadPath: string
};
