import type { FileTypeResult } from "file-type";
import type { UploadDirReqBody } from "../../routes/dir/dir.type";
import type { DirItem, User } from "../../index.type";

import isSupportedFileFormat from "../../utils/is-unsupported-file-format.util";
import isPathSecure from "../../utils/is-path-secure.util";
import isPathHasBase from "../../utils/is-path-has-base.util";
import CaughtError from "../../utils/Caught-Error.util";

import HTTP_ERRORS from "../../const/HTTP-ERRORS.const";
import DIR_ITEM_TYPES from "../../const/DIR-ITEM-TYPES.const";

import fsSync from "node:fs";
import fsAsync from "node:fs/promises";
import path from "node:path/posix";
import { fileTypeFromFile } from "file-type";

export default async function upload(
  user: User, 
  body: UploadDirReqBody, 
  files: Express.Multer.File[]
): Promise<DirItem[]> {
  const { uploadPath } = body;
  const items: DirItem[] = [];
  const rootPath: string = path.normalize(user.root_path);
  const uploadFullPath: string = path.resolve(rootPath, path.normalize(uploadPath));

  if(!isPathSecure(rootPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to upload files into unsecure root directory ${rootPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not upload into this directory!")
    });
  }

  if(!isPathSecure(uploadFullPath) || !isPathHasBase(rootPath, uploadFullPath)) {
    throw new CaughtError({
      server: {
        message: `${user.id} trying to upload files into unsecure directory ${uploadFullPath}`
      },
      client: HTTP_ERRORS.FORBIDDEN("You can not upload into this directory!")
    });
  }

  for(let index: number = 0; index < files.length; index++) {
    const file: Express.Multer.File = files[index];
    const fileType: FileTypeResult | undefined = await fileTypeFromFile(file.path);
    const fileDistPath: string = path.resolve(uploadFullPath, path.normalize(file.fieldname));
   
    if(fileType && !isSupportedFileFormat(fileType.ext)) {
      throw new CaughtError({
        server: {
          message: `${user.id} trying to upload file of unsupported format ${fileType.ext} ${fileType.mime}`
        },
        client: HTTP_ERRORS.BAD_REQUEST(`${fileType.ext} is unsupported file format"`)
      });
    }

    if(!isPathSecure(fileDistPath) || !isPathHasBase(rootPath, fileDistPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} trying to upload files into unsecure directory ${uploadFullPath}`
        },
        client: HTTP_ERRORS.FORBIDDEN("You can not upload into this directory!")
      });
    }

    if(fsSync.existsSync(fileDistPath)) {
      throw new CaughtError({
        server: {
          message: `${user.id} tryng to upload file that alredy exist ${fileDistPath}`
        },
        client: HTTP_ERRORS.CONFLICT(`${file.fieldname} alredy exist!`)
      });
    }

    await fsAsync.rename(file.path, fileDistPath);
    items.push({
      name: file.fieldname,
      path: uploadPath,
      type: DIR_ITEM_TYPES.FILE,
      extention: path.extname(file.fieldname),
    });
  }

  return items;
};
