import type { FileTypeResult } from "file-type";
import type { ObjectStorageUploadReqBody } from "../../routes/object-storage/object-storage-route.type";
import type { StorageObject, StorageObjectProcessOptions, User } from "../../index.type";

import { isFileSafe, isPathSafe, isMediaFile } from "../../utils/is.util";
import { HTTP400Error, HTTP401Error } from "../../utils/HTTP-Error.util";
import ffmpeg from "../../utils/ffmpeg/ffmpeg.util";
import SagaPattern from "../../utils/Saga-Pattern/Saga-Pattern.util";

import app from "../../Application";

import fsAsync from "node:fs/promises";
import path from "node:path";
import { fileTypeFromFile } from "file-type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import objectStorageService from "./object-storage.service";

import STORAGE_OBJECT_TYPES from "../../const/STORAGE_OBJECT_TYPES.const";

export default async function upload(
  user: User, 
  body: ObjectStorageUploadReqBody, 
  files: Express.Multer.File[]
): Promise<StorageObject[]> {
  const { conf } = app.context;
  const { parentId } = body;
  const saga: SagaPattern = new SagaPattern({ stepRetryCount: 1, compensateRetryCount: 2 });
  const items: StorageObject[] = [];
  const parent: StorageObject | undefined = await objectStorageRepo.getById(parentId);
  
  if(!parent) {
    throw new HTTP401Error(
      `User ${user.id} has tried to upload files into not existing directory ${parentId}`,
      "You can not upload files into not existing directory!"
    );
  }
    
  for(let index: number = 0; index < files.length; index++) {
    const file: Express.Multer.File = files[index]!;
    const fileType: FileTypeResult | undefined = await fileTypeFromFile(file.path);
    const options: StorageObjectProcessOptions | undefined = body[index];
    const filePath = path.parse(file.originalname);
    const ext: string = (fileType?.ext || filePath.ext).toLowerCase();

    if(!isFileSafe(ext)) {
      throw new HTTP400Error(
        `User ${user.id} has tried to upload unsafe file ${ext}`,
        `${ext} files can not be uploaded!`
      );
    }

    const fileBasePath: string = path.resolve(`${conf.BASE_STORAGE_PATH}/${user.id}`);
    const fileName: string = `${options?.name || filePath.name}.${ext}`;
    const newObject: StorageObject = objectStorageService.create({
      name: fileName,
      type: STORAGE_OBJECT_TYPES.FILE,
      user_id: user.id,
      parent_id: parentId,
      mime_type: file.mimetype,
      is_root: false
    });
    const dstPath: string = path.resolve(`${fileBasePath}/${newObject.id}`);

    if(!isPathSafe(fileBasePath, dstPath)) {
      throw new HTTP400Error(
        `User ${user.id} has tried to upload file into suspicious directory ${dstPath}`,
        "You can not upload files into this directory!"
      );
    }
    
    (await saga
      .add(
        async (): Promise<void> => {
          if(isMediaFile(file.mimetype)) {
            await ffmpeg(file.path)
              .resize(options?.width, options?.height)
              .process({ [options?.convertTo || ext]: {...options }})
              .outputFormatFromExtention(options?.convertTo || ext)
              .outputFile(dstPath);
          } else {
            await fsAsync.rename(file.path, dstPath);
          }
          
          await fsAsync.rm(file.path, { force: true });
          await objectStorageService.save(newObject);
        },
        async (): Promise<void> => {
          await fsAsync.rm(file.path, { force: true });
          await fsAsync.rm(dstPath, { force: true });
        }
      )
      .execute())
      .throw();

    items.push(newObject);
  }

  return items;
};
