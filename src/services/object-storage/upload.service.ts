import type { FileTypeResult } from "file-type";
import type { ObjectStorageUploadReqBody } from "../../routes/object-storage/object-storage-route.type";
import type { StorageObject, StorageObjectProcessOptions, User } from "../../index.type";

import { isMimeTypeSafe, isExtentionSafe, isPathSafe, isMediaFile } from "../../utils/is.util";
import ffmpeg from "../../utils/ffmpeg/ffmpeg.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERROR_CODES from "../../const/HTTP_ERROR_CODES.const";
import DIR_ITEM_TYPES from "../../const/DIR-ITEM-TYPES.const";

import { serverConfigs } from "../../index";

import fsAsync from "node:fs/promises";
import path from "node:path";
import { fileTypeFromFile } from "file-type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import objectStorageService from "./object-storage.service";

export default async function upload(
  user: User, 
  body: ObjectStorageUploadReqBody, 
  files: Express.Multer.File[]
): Promise<StorageObject[]> {
  const { parentId } = body
  const items: StorageObject[] = [];
  const parent: StorageObject | undefined = await objectStorageRepo.getById(parentId);
  
  if(!parent) {
    throw new CaughtError(
      HTTP_ERROR_CODES.BAD_REQUEST,
      `${user.id} has tried to upload files into not existing directory ${parentId}`,
      "Can not upload files into unknown directory!"
    );
  }
    
  for(let index: number = 0; index < files.length; index++) {
    const file: Express.Multer.File = files[index];
    const fileType: FileTypeResult | undefined = await fileTypeFromFile(file.path);
    const options: StorageObjectProcessOptions | undefined = body[index];
    const filePath = path.parse(file.originalname);
    const extention: string = (fileType?.ext || filePath.ext).toLowerCase();

    if(!fileType?.mime || !isExtentionSafe(extention) || !isMimeTypeSafe(fileType.mime)) {
      throw new CaughtError(
        HTTP_ERROR_CODES.BAD_REQUEST,
        `${user.id} has tried to upload unsafe file ext:${extention} mime-type:${file.mimetype}`,
        `${extention} files are not supported!`
      );
    }

    const fileBasePath: string = `${serverConfigs.BASE_USERS_PATH}/${user.id}`;
    const filename: string = `${options?.name || filePath.name}.${extention}`;
    const newObject: StorageObject = await objectStorageService.create({
      name: filename,
      type: DIR_ITEM_TYPES.FILE,
      user_id: user.id,
      parent_id: parentId,
      mime_type: file.mimetype
    });
    const dstPath: string = `${fileBasePath}/${newObject.id}`;

    if(!isPathSafe(fileBasePath, dstPath)) {
      throw new CaughtError(
        HTTP_ERROR_CODES.BAD_REQUEST,
        `${user.id} has tried to upload file into suspicious directory ${dstPath}`,
        "You can not upload files into this directory!"
      );
    }

    if(isMediaFile(file.mimetype)) {
      await ffmpeg(file.path)
        .resize(options?.width, options?.height)
        .process({ [options?.convertTo || extention]: {...options }})
        .outputFormatFromExtention(options?.convertTo || extention)
        .outputFile(dstPath);
      await fsAsync.rm(file.path);
    } else {
      await fsAsync.rename(file.path, dstPath);
    }

    await objectStorageService.save(newObject);

    items.push(newObject);
  }

  return items;
};
