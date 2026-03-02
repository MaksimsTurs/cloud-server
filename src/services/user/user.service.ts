import logOut from "./log-out.service";
import logIn from "./log-in.service";
import logUp from "./log-up.service";
import getById from "./get-by-id.service";
import getBy from "./get-by.service";
import refreshToken from "./refresh-token.service";

const userService = {
  logUp,
  logOut,
  logIn,
  getById,
  getBy,
  refreshToken
} as const;

export default userService;
