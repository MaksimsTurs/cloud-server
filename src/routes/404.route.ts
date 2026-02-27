import HTTP_ERRORS from "../const/HTTP-ERRORS.const";

import CaughtError from "../utils/Caught-Error.util";

export default function defaultRoute(): void {
  throw new CaughtError({
    server: {
      message: "Request on unknown path"
    },
    client: HTTP_ERRORS.NOT_FOUND("Path not found!")
  });
};
