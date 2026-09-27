import type { StorageObject } from "../../index.type";
import type { ObjectStorageServiceCreateParam } from "./object-storage-service.type";

import generateId from "../../utils/generate-id.util";

export default function create(data: ObjectStorageServiceCreateParam): StorageObject {
  return {...data, id: generateId() };
};
