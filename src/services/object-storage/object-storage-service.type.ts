import type { StorageObject } from "../../index.type";

export type ObjectStorageServiceGetAllReturn = {
  items: StorageObject[]
  parent: StorageObject
};

export type ObjectStorageServiceCreateParam = Omit<StorageObject, "id">;

export type ObjectStorageServiceCopyReturn = StorageObject[];
