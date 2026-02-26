import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate-input.middleware";
import handleError from "../../middlewares/handle-errors.middleware";

import read from "./read.route";
import copy from "./copy.route";
import move from "./move.route";
import remove from "./remove.route";

import VALIDATION_SCHEMES from "../../const/VALIDATION-SCHEMES.const";

export default {
  read: [
    validate("query", VALIDATION_SCHEMES.DIR_READ),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    read,
    handleError
  ],
  copy: [
    validate("body", VALIDATION_SCHEMES.DIR_COPY),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    copy,
    handleError
  ],
  move: [
    validate("body", VALIDATION_SCHEMES.DIR_MOVE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    move,
    handleError
  ],
  remove: [
    validate("body", VALIDATION_SCHEMES.DIR_REMOVE),
    validate("cookies", VALIDATION_SCHEMES.AUTH),
    auth,
    remove,
    handleError
  ]
} as const;
