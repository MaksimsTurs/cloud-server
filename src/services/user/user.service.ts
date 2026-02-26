import create from "./create.service";
import getById from "./get-by-id.service";

const userService = {
  create,
  getById
} as const;

export default userService;
