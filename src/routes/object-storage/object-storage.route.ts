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

import isAuth from "../../middlewares/is-auth.middleware";
import isVerified from "../../middlewares/is-verified.middleware";
import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import convertFormDataToObject from "../../middlewares/convert-form-data-to-object.middleware";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default function initObjectStorageRouter(uploader: Multer): Router {
  return express
    .Router()
    .post("/get/all",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("body", VALIDATION_SCHEMES.STORAGE.GET_OBJECT_BY_ID),
      isAuth,
      isVerified,
      getAll,
      handleError
    )
    .get("/get/:id",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("params", VALIDATION_SCHEMES.STORAGE.GET_OBJECT_BY_ID),
      isAuth,
      isVerified,
      getById,
      handleError
    )
    .post("/copy",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("body", VALIDATION_SCHEMES.STORAGE.COPY),
      isAuth,
      isVerified,
      copy,
      handleError
    )
    .post("/move",     
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("body", VALIDATION_SCHEMES.STORAGE.MOVE),
      isAuth,
      isVerified,
      move,
      handleError
    )
    .post("/remove",    
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("body", VALIDATION_SCHEMES.STORAGE.REMOVE),
      isAuth,
      isVerified,
      remove,
      handleError
    )
    .post("/create",     
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("body", VALIDATION_SCHEMES.STORAGE.CREATE),
      isAuth,
      isVerified,
      create,
      handleError
    )
    .post("/upload",
      uploader.any(),
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      convertFormDataToObject,
      validate("body", VALIDATION_SCHEMES.STORAGE.KNOWN_UPLOAD_PARAMS),
      validate("body", VALIDATION_SCHEMES.STORAGE.UNKNOWN_UPLOAD_PARAMS),
      isAuth,
      isVerified,
      upload,
      handleError
    );
};
