import create from "./create.service";
import save from "./save.service";
import sendResetPasswordEmail from "./send-reset-password-email.service";
import resetPassword from "./reset-password.service";
import sendConfirmEmail from "./send-confirm-email.service";
import confirmEmail from "./confirm-email.service";
import getById from "./get-by-id.service";
import getOne from "./get-one.service";

const userService = {
  create,
  save,
  getById,
  getOne,
  sendResetPasswordEmail,
  resetPassword,
  sendConfirmEmail,
  confirmEmail,
} as const;

export default userService;
