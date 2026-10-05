import type { Router } from "express";

import express from "express";

import logUp from "./log-up.route";
import logOut from "./log-out.route";
import logIn from "./log-in.route";
import getMe from "./get-me.route";
import refreshAccessToken from "./refresh-access-token.route";
import confirmEmail from "./confirm-email.route";
import resetPassword from "./reset-password.route";
import requestResetPassword from "./request-reset-password.route";
import requestConfirmEmail from "./request-confirm-email.route";
import downloadMyData from "./download-my-data.route";
import removeMe from "./remove-me.route";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import isAuth from "../../middlewares/is-auth.middleware";
import isNotVerified from "../../middlewares/is-not-verified.middleware";

import VALIDATION_SCHEMES from "../../const/VALIDATION_SCHEMES.const";

export default function createUserRouter(): Router {
  return express
    .Router()
    .get("/get-me",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      isAuth,
      getMe,
      handleError
    )
    .get("/remove-me",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      isAuth,
      removeMe,
      handleError
    )
    .get("/download-my-data",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      isAuth,
      downloadMyData,
      handleError
    )
    .post("/log-up",
      validate("body", VALIDATION_SCHEMES.USER.LOG_UP),
      logUp,
      handleError
    )
    .post("/log-in",
      validate("body", VALIDATION_SCHEMES.USER.LOG_IN),
      logIn,
      handleError
    )
    .get("/log-out",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      isAuth,
      logOut,
      handleError
    )
    .get("/refresh-token", 
      validate("cookies", VALIDATION_SCHEMES.USER.REFRESH_TOKEN),
      refreshAccessToken,
      handleError
    )
    .post("/request-confirm-email", 
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("body", VALIDATION_SCHEMES.USER.REQUEST_CONFIRM_EMAIL),
      isAuth,
      isNotVerified,
      requestConfirmEmail,
      handleError
    )
    .post("/request-reset-password", 
      validate("body", VALIDATION_SCHEMES.USER.REQUEST_RESET_PASSWORD),
      requestResetPassword,
      handleError
    )
    .get("/confirm",
      validate("cookies", VALIDATION_SCHEMES.COMMON.IS_AUTH),
      validate("query", VALIDATION_SCHEMES.USER.CONFIRM_EMAIL),
      isAuth,
      isNotVerified,
      confirmEmail,
      handleError
    )
    .put("/reset-password",
      validate("body", VALIDATION_SCHEMES.USER.RESET_PASSWORD),
      resetPassword,
      handleError
    );
};
