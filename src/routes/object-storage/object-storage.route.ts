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

import VALIDATION_SCHEMES from "../../const/VALIDATION-SCHEMES.const";

import isAuthorized from "../../middlewares/is-authorized.middleware";
import isVerified from "../../middlewares/is-verified.middleware";
import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import convertFormDataToObject from "../../middlewares/convert-form-data-to-object.middleware";

const dirRouter: Router = express.Router();

export default function initObjectStorageRouter(uploader: Multer): Router {
  dirRouter.post("/get/all",     
    validate("query", VALIDATION_SCHEMES.DIR_READ),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    getAll,
    handleError
  );

  dirRouter.get("/get/:id",
    validate("params", VALIDATION_SCHEMES.DIR_READ_OBJECT),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    getById,
    handleError
  );

  dirRouter.post("/copy",     
    validate("body", VALIDATION_SCHEMES.DIR_COPY),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    copy,
    handleError
  );

  dirRouter.post("/move",     
    validate("body", VALIDATION_SCHEMES.DIR_MOVE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    move,
    handleError
  );

  dirRouter.post("/remove",    
    validate("body", VALIDATION_SCHEMES.DIR_REMOVE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    remove,
    handleError
  );

  dirRouter.post("/create",     
    validate("body", VALIDATION_SCHEMES.DIR_CREATE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    create,
    handleError
  );

  dirRouter.post("/upload",
    uploader.any(),
    convertFormDataToObject,
    validate("body", VALIDATION_SCHEMES.DIR_UPLOAD_PARENT_ID),
    validate("body", VALIDATION_SCHEMES.DIR_UPLOAD_PROCESS_OPTIONS),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    isAuthorized,
    isVerified,
    upload,
    handleError
  );

  return dirRouter;
};
