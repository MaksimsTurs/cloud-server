import type { Request, Response } from "express";
import type { StorageObject } from "../../index.type";
import type { ObjectStorageGetObjectReqParams, ObjectStorageGetObjectResLocals } from "./object-storage-route.type";

import objectStorageService from "../../services/object-storage/object-storage.service";

import path from "node:path";
import fsAsync from "node:fs/promises";

import { serverConfigs } from "../../index";
import { isPathSafe } from "../../utils/is.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";

export default async function getById(
  req: Request<ObjectStorageGetObjectReqParams>, 
  res: Response<unknown, ObjectStorageGetObjectResLocals>
): Promise<void> {
  const { id } = req.params;
  const { user } = res.locals;
  const storageObject: StorageObject | undefined = await objectStorageService.getById(id);

  if(!storageObject) {
    throw new CaughtError(
      HTTP_ERROR_CODES.NOT_FOUND,
      `User ${user.id} has tried get not existed file ${id}`,
      `File ${id} not found!`
    );
  }

  const basePath: string = `${serverConfigs.BASE_USERS_PATH}/${user.id}`;
  const filePath: string = path.resolve(basePath, storageObject!.id);

  if(!isPathSafe(basePath, filePath)) {
    throw new CaughtError(
      HTTP_ERROR_CODES.BAD_REQUEST,
      `User ${user.id} has tried get suspicous file ${filePath}`,
      "You can not get this file!"
    );
  }

  const buffer: Buffer<ArrayBuffer> = await fsAsync.readFile(filePath);

  res.status(200).send({...storageObject, buffer });
};
