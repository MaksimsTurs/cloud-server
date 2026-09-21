import type { Router } from "express";

import express from "express";

import logUp from "./log-up.route";
import logOut from "./log-out.route";
import logIn from "./log-in.route";
import init from "./init.route";
import regenerateAccessToken from "./regenerate-access-token.route";
import confirmEmail from "./confirm-email.route";
import resetPassword from "./reset-password.route";
import requestResetPassword from "./request-reset-password.route";
import requestConfirmEmail from "./request-confirm-email.route";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import isAuthenticated from "../../middlewares/is-authenticated.middleware";
import isNotVerified from "../../middlewares/is-not-verified.middleware";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

const userRouter: Router = express.Router();

export default function initUserRouter(): Router {
  userRouter.get("/init",
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    isAuthenticated,
    init,
    handleError
  );

  userRouter.post("/log-up",
    validate("body", VALIDATION_SCHEMES.USER_LOG_UP_SCHEME),
    logUp,
    handleError
  );

  userRouter.post("/log-in",
    validate("body", VALIDATION_SCHEMES.USER_LOG_IN_SCHEME),
    logIn,
    handleError
  );

  userRouter.get("/log-out",    
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    isAuthenticated,
    logOut,
    handleError
  );

  userRouter.get("/confirm",
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    isAuthenticated,
    isNotVerified,
    validate("query", VALIDATION_SCHEMES.USER_CONFIRM_EMAIL_SCHEME),
    confirmEmail,
    handleError
  );

  userRouter.get("/refresh-token", 
    validate("cookies", VALIDATION_SCHEMES.USER_REFRESH_TOKEN_SCHEME),
    regenerateAccessToken,
    handleError
  );

  userRouter.get("/request-confirm-email", 
    validate("cookies", VALIDATION_SCHEMES.IS_AUTHORIZED_SCHEMA),
    isAuthenticated,
    isNotVerified,
    requestConfirmEmail,
    handleError
  );

  userRouter.post("/request-reset-password", 
    validate("body", VALIDATION_SCHEMES.USER_REQUEST_RESET_PASSWORD_SCHEME),
    requestResetPassword,
    handleError
  );

  userRouter.put("/reset-password",
    validate("body", VALIDATION_SCHEMES.USER_RESET_PASSWORD_SCHEME),
    resetPassword,
    handleError
  );

  return userRouter;
};
