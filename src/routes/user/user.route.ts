import logUp from "./log-up.route";
import init from "./init.route";

import VALIDATION_SCHEMES from "../../const/VALIDATION-SCHEMES.const";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";
import auth from "../../middlewares/auth.middleware";

export default {
  logUp: [
    validate("body", VALIDATION_SCHEMES.LOG_UP), 
    logUp, 
    handleError
  ],
  init: [
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    init,
    handleError
  ]
} as const;
