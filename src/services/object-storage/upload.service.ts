import type { FileTypeResult } from "file-type";
import type { StorageObject, User } from "../../index.type";

import isSupportedFileFormat from "../../utils/is-unsupported-file-format.util";
import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import DIR_ITEM_TYPES from "../../const/DIR-ITEM-TYPES.const";

import { serverConfigs } from "../../index";

import fsAsync from "node:fs/promises";

import { fileTypeFromFile } from "file-type";

import objectStorageRepo from "../../repos/Object-Storage.repo";

import objectStorageService from "./object-storage.service";

export default async function upload(
  user: User, 
  parentId: string, 
  files: Express.Multer.File[]
): Promise<StorageObject[]> {
  const items: StorageObject[] = [];
  const parent: StorageObject | undefined = await objectStorageRepo.getById(parentId);

  if(!parent) {
    throw new CaughtError({
      server: {
        message: `${user.id} has tried to upload files into not existing directory!`
      },
      client: HTTP_ERRORS.BAD_REQUEST("You can not upload items into not existing directory!")
    });
  }

  for(let index: number = 0; index < files.length; index++) {
    const file: Express.Multer.File = files[index];
    const fileType: FileTypeResult | undefined = await fileTypeFromFile(file.path);

    if(fileType && !isSupportedFileFormat(fileType.ext, fileType.mime)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to upload file with suspicious format ${fileType.ext} ${fileType.mime}`
        },
        client: HTTP_ERRORS.BAD_REQUEST(`File format ${fileType.mime} is not supported!`)
      });
    }

    const userDirPath: string = `${serverConfigs.BASE_USERS_PATH}/${user.id}`;
    // TODO Fix this
    //@ts-ignore
    const newObject: StorageObject = await objectStorageService.create({
      name: file.fieldname,
      type: DIR_ITEM_TYPES.FILE,
      user_id: user.id,
      parent_id: parentId
    });
    const dstPath: string = `${userDirPath}/${newObject.id}`;

    if(!isPathHasBase(userDirPath, dstPath) || !isPathSecure(dstPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} has tried to upload file into suspicious directory ${dstPath}`
        },
        client: HTTP_ERRORS.BAD_REQUEST("You can not upload files into this directory!")
      });
    }

    await objectStorageService.save(newObject);
    await fsAsync.rename(file.path, dstPath);
    items.push(newObject);
  }

  return items;
};
