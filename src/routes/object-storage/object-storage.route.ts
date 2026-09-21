import type { Router } from "express";
import type { Multer } from "multer";

import express from "express";

import getAll from "./get-all.route";
import getById from "./get-by-id.route";
import copy from "./copy.route";
import move from "./move.route";
import remove from "./remove.route";
import create from "./create.route";
import upload from "./upload.route";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

import isAuthenticated from "../../middlewares/is-authenticated.middleware";
import isVerified from "../../middlewares/is-verified.middleware";
import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import convertFormDataToObject from "../../middlewares/convert-form-data-to-object.middleware";

const dirRouter: Router = express.Router();

export default function initObjectStorageRouter(uploader: Multer): Router {
  dirRouter.post("/get/all",     
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    validate("query", VALIDATION_SCHEMES.FOLDER_GET_SCHEME),
    isAuthenticated,
    isVerified,
    getAll,
    handleError
  );

  dirRouter.get("/get/:id",
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    validate("params", VALIDATION_SCHEMES.FOLDER_GET_OBJECT_SCHEME),
    isAuthenticated,
    isVerified,
    getById,
    handleError
  );

  dirRouter.post("/copy",     
    validate("body", VALIDATION_SCHEMES.FOLDER_COPY_SCHEME),
    isAuthenticated,
    isVerified,
    copy,
    handleError
  );

  dirRouter.post("/move",     
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    validate("body", VALIDATION_SCHEMES.FOLDER_MOVE_SCHEME),
    isAuthenticated,
    isVerified,
    move,
    handleError
  );

  dirRouter.post("/remove",    
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    validate("body", VALIDATION_SCHEMES.FOLDER_REMOVE_SCHEME),
    isAuthenticated,
    isVerified,
    remove,
    handleError
  );

  dirRouter.post("/create",     
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    validate("body", VALIDATION_SCHEMES.FOLDER_CREATE_SCHEME),
    isAuthenticated,
    isVerified,
    create,
    handleError
  );

  dirRouter.post("/upload",
    uploader.any(),
    convertFormDataToObject,
    validate("body", VALIDATION_SCHEMES.FILES_UPLOAD_UNKNOWN_PARAMS_SCHEME),
    validate("body", VALIDATION_SCHEMES.FILES_UPLOAD_KNOWN_PARAMS_SCHEME),
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    isAuthenticated,
    isVerified,
    upload,
    handleError
  );

  return dirRouter;
};
