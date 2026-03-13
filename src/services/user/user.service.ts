import create from "./create.service";
import save from "./save.service";
import verify from "./verify.service";
import getById from "./get-by-id.service";
import getOne from "./get-one.service";
import refreshToken from "./refresh-token.service";
import init from "./init.service";
import sendConfirmEmail from "./send-confirm-email.service";
import confirmEmail from "./confirm-email.service";

const userService = {
  create,
  save,
  verify,
  getById,
  getOne,
  refreshToken,
  init,
  sendConfirmEmail,
  confirmEmail
} as const;

export default userService;
