import type { StorageObject } from "../../index.type";

export type GetStorageObjectsResLocals = {
  userId: string
};

export type GetStorageObjectsResBody = {
  parent: StorageObject
  items: StorageObject[]
};

export type GetStorageObjectsReqBody = {
  id?: string
};

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

export type CreateStorageObjectResLocals = {
  userId: string
};

export type CreateStorageObjectReqBody = {
  name: string
  parentId?: string
};

export type UploadDirResLocals = {
  userId: string
};

export type UploadDirReqBody = {
  uploadPath: string
};
