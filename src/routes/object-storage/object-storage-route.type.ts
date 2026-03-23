import type { StorageObject, User } from "../../index.type";

export type ObjectStorageGetAllResLocals = {
  user: User
};

export type ObjectStorageGetAllReqBody = {
  id?: string
};

export type ObjectStorageGetAllResBody = {
  parent: StorageObject
  items: StorageObject[]
};

//###################################################

export type ObjectStorageCopyReqBody = {
  parentId: string
  items: Record<string, StorageObject>
};

export type ObjectStorageCopyResLocals = {
  user: User
};

//###################################################

export type ObjectStorageCreateItemReqBody = {
  name: string
  parentId: string
};

export type ObjectStorageCreateItemResLocals = {
  user: User
};

//###################################################

export type ObjectStorageGetObjectReqParams = {
  id: string
};

export type ObjectStorageGetObjectResLocals = {
  user: User
};

//###################################################

export type ObjectStorageMoveObjectsResLocals = {
  user: User
};

export type ObjectStorageMoveObjectsReqBody = {
  parentId: string
  items: Record<string, StorageObject>
};

//###################################################

export type ObjectStorageRemoveObjectsReqBody = Record<string, StorageObject>;

export type ObjectStorageRemoveObjectsResLocals = {
  user: User
};

//###################################################

export type ObjectStorageUploadReqBody = {
  parentId?: string
} & { [index: string]: string };

export type ObjectStorageUploadResLocals = {
  user: User 
};

//###################################################

export type ObjectStoragePreviewReqParams = {
  id: string
};
