import logUp from "./log-up.route";
import initUser from "./init-user.route";

import VALIDATIONSCHEMES from "../../const/VALIDATION-SCHEMES.const";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import auth from "../../middlewares/auth.middleware";

export default {
  logUp: [
    validate("body", VALIDATIONSCHEMES.LOG_UP_BODY), 
    logUp, 
    handleError
  ],
  initUser: [
    validate("cookies", VALIDATIONSCHEMES.AUTH),
    auth,
    initUser,
    handleError
  ]
} as const;
