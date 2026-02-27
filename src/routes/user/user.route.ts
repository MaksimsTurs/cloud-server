import type { Router } from "express";

import express from "express";

import logUp from "./log-up.route";
import logOut from "./log-out.route";
import logIn from "./log-in.route";
import init from "./init.route";

import VALIDATION_SCHEMES from "../../const/VALIDATION-SCHEMES.const";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import auth from "../../middlewares/auth.middleware";

const userRouter: Router = express.Router();

export default function initUserRouter(): Router {
  userRouter.post("/log-up", 
    validate("body", VALIDATION_SCHEMES.LOG_UP), 
    logUp, 
    handleError
  );

  userRouter.post("/log-in",
    validate("body", VALIDATION_SCHEMES.LOG_IN),
    logIn,
    handleError
  );

  userRouter.get("/log-out",    
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    logOut,
    handleError
  );

  userRouter.get("/init",     
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    init,
    handleError
  );

  return userRouter;
};
