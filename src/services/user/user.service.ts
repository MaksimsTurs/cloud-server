import create from "./create.service";
import save from "./save.service";
import verify from "./verify.service";
import getById from "./get-by-id.service";
import getOne from "./get-one.service";
import refreshToken from "./refresh-token.service";
import init from "./init.service";

const userService = {
  create,
  save,
  verify,
  getById,
  getOne,
  refreshToken,
  init
} as const;

export default userService;
