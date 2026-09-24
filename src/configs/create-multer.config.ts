import type { FileFilterCallback, Multer, StorageEngine } from "multer";
import type { Request } from "express";
import type { FileTypeResult } from "file-type";

import multer from "multer";
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";
import { isUndefined } from "@maksims/is.js";

import CaughtError from "../utils/Caught-Error.util";
import generateId from "../utils/generate-id.util";
import app from "../Application";
import { isFileSafe } from "../utils/is.util";

import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";
import UPLOADER from "../const/UPLOADER.const";

type MulterStorageCreationCallback = (error: Error | null, path: string) => void;

export default function createUploader(): Multer {
  const storage: StorageEngine = multer.diskStorage({
    destination: fileDestination,
    filename: fileName
  });
  return multer({
    storage,
    fileFilter,
    limits: {
      files: UPLOADER.MAX_FILES,
      fileSize: UPLOADER.MAX_FILE_SIZE
    }
  });
};

function fileDestination(
  _req: Request, 
  _file: Express.Multer.File, 
  callback: MulterStorageCreationCallback
): void {
  callback(null, app.context.conf.BASE_TMP_PATH);
};

function fileName(
  _req: Request, 
  file: Express.Multer.File, 
  callback: MulterStorageCreationCallback
): void {
  callback(null, `${generateId()}${path.extname(file.originalname)}`);
};

function fileFilter(
  req: Request, 
  file: Express.Multer.File, 
  callback: FileFilterCallback
): void {
  // TODO:  Maybe return preview filter method (path.extname(file.originalname))
  //        this method may be safer but slower.
  fileTypeFromBuffer(file.buffer)
    .then((res: FileTypeResult | undefined) => {
      if(isUndefined(res)) {
        callback(new CaughtError(
          HTTP_ERROR_CODES.BAD_REQUEST,
          `${req.socket.remoteAddress} try to upload file with unknown format`,
          `Can not upload file with unknown format!`
        ));
      } else if(!isFileSafe(res.ext)) {
        callback(new CaughtError(
          HTTP_ERROR_CODES.BAD_REQUEST,
          `${req.socket.remoteAddress} try to upload file with unsafe format(${res.ext})`,
          `${res.ext} files can not be uploaded!`
        ));
      } else {
        callback(null, true);
      } 
    })
    .catch(reason => callback(reason));
};
