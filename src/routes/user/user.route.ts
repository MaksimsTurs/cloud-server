import type { Router } from "express";

import express from "express";

import logUp from "./log-up.route";
import logOut from "./log-out.route";
import logIn from "./log-in.route";
import init from "./init.route";
import confirm from "./confirm.route";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import auth from "../../middlewares/auth.middleware";
import refreshToken from "./refresh-token.route";

import VALIDATION_SCHEMES from "../../const/VALIDATION-SCHEMES.const";

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
    init,
    handleError
  );

  userRouter.get("/confirm",
    validate("query", VALIDATION_SCHEMES.CONFIRM_EMAIL),
    confirm,
    handleError
  );

  userRouter.get("/refresh-token", 
    validate("cookies", VALIDATION_SCHEMES.REFRESH_TOKEN),
    auth,
    refreshToken,
    handleError
  );

  return userRouter;
};
