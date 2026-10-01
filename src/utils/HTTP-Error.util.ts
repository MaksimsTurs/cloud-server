import HTTP_ERROR_CODES from "../const/HTTP_ERROR_CODES.const";

type HTTPErrorOptions = {
  code: number
  serverMessage?: string
  clientMessage?: string
};

export class HTTPError extends Error {
  public options: HTTPErrorOptions;

  public constructor(code: number, serverMessage?: string, clientMessage?: string) {
    super(serverMessage);
    this.options = { code, serverMessage, clientMessage };
  };
};

export class HTTP400Error extends HTTPError {
  public constructor(serverMessage?: string, clientMessage: string = "Bad Request!") {
    super(HTTP_ERROR_CODES.BAD_REQUEST, serverMessage, clientMessage);
  };
};

export class HTTP401Error extends HTTPError {
  public constructor(serverMessage?: string, clientMessage: string = "Unauthorized!") {
    super(HTTP_ERROR_CODES.UNAUTHORIZED, serverMessage, clientMessage);
  };
};

export class HTTP403Error extends HTTPError {
  public constructor(serverMessage?: string, clientMessage: string = "Forbidden!") {
    super(HTTP_ERROR_CODES.FORBIDDEN, serverMessage, clientMessage);
  };
};

export class HTTP404Error extends HTTPError {
  public constructor(serverMessage?: string, clientMessage: string = "Not Found!") {
    super(HTTP_ERROR_CODES.NOT_FOUND, serverMessage, clientMessage);
  };
};

export class HTTP409Error extends HTTPError {
  public constructor(serverMessage?: string, clientMessage: string = "Conflict!") {
    super(HTTP_ERROR_CODES.CONFLICT, serverMessage, clientMessage);
  };
};

export class HTTP429Error extends HTTPError {
  public constructor(serverMessage?: string, clientMessage: string = "To Many Requests!") {
    super(HTTP_ERROR_CODES.TO_MANY_REQUESTS, serverMessage, clientMessage);
  };
};
