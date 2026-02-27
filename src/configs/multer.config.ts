import type { FileFilterCallback, Multer, StorageEngine } from "multer";
import type { Request } from "express";

import multer from "multer";
import fsSync from "node:fs";
import path from "node:path/posix";

import HTTP_ERRORS from "../const/HTTP-ERRORS.const";

import CaughtError from "../utils/Caught-Error.util";
import isSupportedFileFormat from "../utils/is-unsupported-file-format.util";

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
  const tmpPath: string = process.env.TMP_PATH as string;

  if(!fsSync.existsSync(tmpPath)) {
    fsSync.mkdir(tmpPath, (error): void => {
      if(error) {
        callback(error, "");
      } else {
        callback(null, tmpPath);
      }
    });
  } else {
    callback(null, tmpPath);
  }
};

function fileName(
  _req: Request, 
  file: Express.Multer.File, 
  callback: MulterStorageCreationCallback
): void {
  callback(null, file.fieldname);
};

function fileFilter(
  req: Request, 
  file: Express.Multer.File, 
  callback: FileFilterCallback
): void {
  const extention: string = path.extname(file.fieldname);
  const mimeType: string = file.mimetype;

  if(!isSupportedFileFormat(extention, mimeType)) {
    callback(new CaughtError({
      server: {
        message: `${req.socket.remoteAddress} try to upload unsupported file format "${extention}"`,
      },
      client: HTTP_ERRORS.BAD_REQUEST(`${extention} is unsupported file format!`)
    }));
  } else {
    callback(null, true);
  }
};
