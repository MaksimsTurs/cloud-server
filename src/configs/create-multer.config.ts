import type { FileFilterCallback, Multer, StorageEngine } from "multer";
import type { Request } from "express";

import multer from "multer";
import path from "node:path";

import generateId from "../utils/generate-id.util";
import app from "../Application";
import { isFileSafe } from "../utils/is.util";
import { HTTP400Error } from "../utils/HTTP-Error.util";

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
  const ext: string = path.extname(file.originalname);
  
  if(!isFileSafe(ext)) {
    callback(new HTTP400Error(
      `Unknown user ${req.socket.remoteAddress} try to upload file with unsafe format ${ext}`,
      `${ext} files can not be uploaded!`
    ));
  } else {
    callback(null, true);
  }
};
