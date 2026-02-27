import type { Router } from "express";
import type { Multer } from "multer";

import express from "express";

import read from "./read.route";
import copy from "./copy.route";
import move from "./move.route";
import remove from "./remove.route";
import create from "./create.route";
import upload from "./upload.route";

import VALIDATION_SCHEMES from "../../const/VALIDATION-SCHEMES.const";

import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";

const dirRouter: Router = express.Router();

export default function initDirRouter(uploader: Multer): Router {
  dirRouter.get("/read",     
    validate("query", VALIDATION_SCHEMES.DIR_READ),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    read,
    handleError
  );

  dirRouter.post("/copy",     
    validate("body", VALIDATION_SCHEMES.DIR_COPY),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    copy,
    handleError
  );

  dirRouter.post("/move",     
    validate("body", VALIDATION_SCHEMES.DIR_MOVE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    move,
    handleError
  );

  dirRouter.post("/remove",    
    validate("body", VALIDATION_SCHEMES.DIR_REMOVE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    remove,
    handleError
  );

  dirRouter.post("/create",     
    validate("body", VALIDATION_SCHEMES.DIR_CREATE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    create,
    handleError
  );

  dirRouter.post("/upload",
    uploader.any(),
    validate("body", VALIDATION_SCHEMES.DIR_UPLOAD),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    upload,
    handleError
  );

  return dirRouter;
};
