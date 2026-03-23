type CaughtErrorOptions = {
  code: number
  serverMessage?: string
  clientMessage?: string
};

class CaughtError extends Error {
  public options: CaughtErrorOptions;

  constructor(code: number, serverMessage?: string, clientMessage?: string) {
    super();

    this.options = {
      code,
      serverMessage,
      clientMessage
    };
  };
};

export default CaughtError;
