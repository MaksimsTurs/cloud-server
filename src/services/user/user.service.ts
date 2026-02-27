import create from "./create.service";
import getById from "./get-by-id.service";
import logOut from "./log-out.service";

const userService = {
  create,
  getById,
  logOut
} as const;

export default userService;
