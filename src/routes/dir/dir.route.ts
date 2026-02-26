import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";

import getDir from "./get-dir.route";

import VALIDATIONSCHEMES from "../../const/VALIDATION-SCHEMES.const";

export default {
  getDir: [
    validate("query", VALIDATIONSCHEMES.GET_DIR),
    validate("cookies", VALIDATIONSCHEMES.AUTH),
    auth,
    getDir,
    handleError
  ]
} as const;
