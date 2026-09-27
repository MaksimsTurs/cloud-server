import type { Request, Response } from "express";
import type { StorageObject } from "../../index.type";
import type { ObjectStorageGetObjectReqParams, ObjectStorageGetObjectResLocals } from "./object-storage-route.type";

import objectStorageService from "../../services/object-storage/object-storage.service";

import path from "node:path";
import fsAsync from "node:fs/promises";

import { isPathSafe } from "../../utils/is.util";
import { HTTP401Error, HTTP404Error } from "../../utils/HTTP-Error.util";

import app from "../../Application";

export default async function getById(
  req: Request<ObjectStorageGetObjectReqParams>, 
  res: Response<unknown, ObjectStorageGetObjectResLocals>
): Promise<void> {
  const { conf } = app.context;
  const { id } = req.params;
  const { user } = res.locals;
  const storageObject: StorageObject | undefined = await objectStorageService.getById(id);

  if(!storageObject) {
    throw new HTTP404Error(
      `User ${user.id} has tried to get not existing file ${id}`,
      "File not found!"
    );
  }

  const basePath: string = `${conf.BASE_STORAGE_PATH}/${user.id}`;
  const filePath: string = path.resolve(basePath, storageObject!.id);

  if(!isPathSafe(basePath, filePath)) {
    throw new HTTP401Error(
      `User ${user.id} has tried to get suspicous file ${filePath}`,
      "You can not get this file!"
    );
  }

  const buffer: Buffer<ArrayBuffer> = await fsAsync.readFile(filePath);

  res.status(200).send({...storageObject, buffer });
};
