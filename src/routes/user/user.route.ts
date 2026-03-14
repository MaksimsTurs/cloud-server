import type { Router } from "express";

import express from "express";

import logUp from "./log-up.route";
import logOut from "./log-out.route";
import logIn from "./log-in.route";
import init from "./init.route";
import regenerateRefreshToken from "./regenerate-refresh-token.route";
import confirmEmail from "./confirm-email.route";
import resetPassword from "./reset-password.route";
import requestResetPassword from "./request-reset-password.route";
import requestConfirmEmail from "./request-confirm-email.route";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import isAuthorized from "../../middlewares/is-authorized.middleware";
import isNotVerified from "../../middlewares/is-not-verified.middleware";

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
    isAuthorized,
    logOut,
    handleError
  );

  userRouter.get("/init",
    isAuthorized,
    init,
    handleError
  );

  userRouter.get("/confirm",
    validate("query", VALIDATION_SCHEMES.CONFIRM_EMAIL),
    isAuthorized,
    isNotVerified,
    confirmEmail,
    handleError
  );

  userRouter.get("/refresh-token", 
    validate("cookies", VALIDATION_SCHEMES.REFRESH_TOKEN),
    isAuthorized,
    regenerateRefreshToken,
    handleError
  );

  userRouter.get("/request-confirm-email", 
    validate("cookies", VALIDATION_SCHEMES.REQUEST_CONFIRM_EMAIL),
    isAuthorized,
    isNotVerified,
    requestConfirmEmail,
    handleError
  );

  userRouter.post("/request-reset-password", 
    validate("body", VALIDATION_SCHEMES.REQUEST_RESET_PASSWORD),
    requestResetPassword,
    handleError
  );

  userRouter.put("/reset-password",
    validate("body", VALIDATION_SCHEMES.RESET_PASSWORD),
    resetPassword,
    handleError
  );

  return userRouter;
};
