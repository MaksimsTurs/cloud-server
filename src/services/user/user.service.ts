import logUp from "./log-up.service";
import create from "./create.service";
import save from "./save.service";
import sendResetPasswordEmail from "./send-reset-password-email.service";
import resetPassword from "./reset-password.service";
import sendConfirmEmail from "./send-confirm-email.service";
import confirmEmail from "./confirm-email.service";
import getById from "./get-by-id.service";
import getOne from "./get-one.service";
import removeById from "./remove-by-id.service";
import generateDataFile from "./generate-data-file.service";
import removeMe from "./remove-me.service";

export default {
  logUp,
  create,
  save,
  getById,
  getOne,
  removeById,
  sendResetPasswordEmail,
  resetPassword,
  sendConfirmEmail,
  confirmEmail,
  generateDataFile,
  removeMe
} as const;
