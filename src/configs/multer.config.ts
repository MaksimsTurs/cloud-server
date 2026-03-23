import type { FileFilterCallback, Multer, StorageEngine } from "multer";
import type { Request } from "express";

import multer from "multer";
import fsSync from "node:fs";
import path from "node:path/posix";

import { serverConfigs } from "../index";

import { isMimeTypeSafe, isExtentionSafe } from "../utils/is.util";
import CaughtError from "../utils/Caught-Error.util";
import generateId from "../utils/generate-id.util";

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
      files: 10,
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
  if(!fsSync.existsSync(serverConfigs.BASE_UPLOAD_TMP_PATH)) {
    fsSync.mkdir(serverConfigs.BASE_UPLOAD_TMP_PATH, (error): void => {
      if(error) {
        callback(error, "");
      } else {
        callback(null, serverConfigs.BASE_UPLOAD_TMP_PATH);
      }
    });
  } else {
    callback(null, serverConfigs.BASE_UPLOAD_TMP_PATH);
  }
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
      `${req.socket.remoteAddress} try to upload unsupported file format "${extention}"`,
      `${extention} is unsupported file format!`
    ));
  } else {
    callback(null, true);
  }
};
