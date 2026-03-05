import type { StorageObject } from "../../index.type";

export type ObjectStorageGetAllResLocals = {
  userId: string
};

export type ObjectStorageGetAllResBody = {
  parent: StorageObject
  items: StorageObject[]
};

export type ObjectStorageGetAllReqBody = {
  id?: string
};

//###################################################

export type ObjectStorageCopyReqBody = {
  parentId: string
  items: Record<string, StorageObject>
};

export type ObjectStorageCopyResLocals = {
  userId: string
};

//###################################################

export type ObjectStorageCreateItemReqBody = {
  name: string
  parentId: string
};

export type ObjectStorageCreateItemResLocals = {
  userId: string
};

//###################################################

export type ObjectStorageGetObjectReqParams = {
  id: string
};

export type ObjectStorageGetObjectResLocals = {
  userId: string
};

//###################################################

export type ObjectStorageMoveObjectsResLocals = {
  userId: string
};

export type ObjectStorageMoveObjectsReqBody = {
  parentId: string
  items: Record<string, StorageObject>
};

//###################################################

export type ObjectStorageRemoveObjectsReqBody = Record<string, StorageObject>;

export type ObjectStorageRemoveObjectsResLocals = {
  userId: string
};

//###################################################

export type ObjectStorageUploadReqBody = {
  parentId: string
};

export type ObjectStorageUploadResLocals = {
  userId: string
};

//###################################################

export type ObjectStoragePreviewReqParams = {
  id: string
};
