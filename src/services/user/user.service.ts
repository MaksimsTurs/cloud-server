import create from "./create.service";
import save from "./save.service";
import verifyPassowrd from "./verify-password.service";
import getById from "./get-by-id.service";
import getOne from "./get-one.service";
import refreshToken from "./refresh-token.service";
import init from "./init.service";
import sendConfirmEmail from "./send-confirm-email.service";
import confirmEmail from "./confirm-email.service";
import generateTokens from "./generate-tokens.service";

const userService = {
  create,
  save,
  verifyPassowrd,
  getById,
  getOne,
  refreshToken,
  init,
  sendConfirmEmail,
  confirmEmail,
  generateTokens
} as const;

export default userService;
