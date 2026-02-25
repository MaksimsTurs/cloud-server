import logUp from "./log-up.route";

import VALIDATIONSCHEMES from "../../const/VALIDATION-SCHEMES.const";

import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";

export default {
  logUp: [
    validate("body", VALIDATIONSCHEMES.LOG_UP_BODY), 
    logUp, 
    handleError
  ]
} as const;
