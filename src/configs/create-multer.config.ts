import type { FileFilterCallback, Multer, StorageEngine } from "multer";
import type { Request } from "express";

import multer from "multer";
import path from "node:path";

import { isMimeTypeSafe, isExtentionSafe } from "../utils/is.util";
import CaughtError from "../utils/Caught-Error.util";
import generateId from "../utils/generate-id.util";
import app from "../Application";

import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";

type MulterStorageCreationCallback = (error: Error | null, path: string) => void;

export default function createUploader(): Multer {
  const storage: StorageEngine = multer.diskStorage({
    destination: fileDestination,
    filename: fileName
  });
  const upload: Multer = multer({
    storage,
    fileFilter,
    limits: {
      files: 19,
      fileSize: 1e+8,
    }
  });

  return upload;
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
  const extention: string = path.extname(file.fieldname);
  const mimeType: string = file.mimetype;

  if(!isMimeTypeSafe(mimeType) || !isExtentionSafe(extention)) {
    callback(new CaughtError(
      HTTP_ERROR_CODES.BAD_REQUEST,
      `${req.socket.remoteAddress} try to upload unsupported file format(${extention})`,
      `${extention} files can not be uploaded!`
    ));
  } else {
    callback(null, true);
  }
};
