type CaughtErrorOptions = {
  client: {
    code: number
    message: string
  }
  server?: {
    message: string
  }
};

class CaughtError extends Error {
  public options: CaughtErrorOptions = {
    client: {
      code: 0,
      message: ""
    },
    server: {
      message: ""
    }
  };

  constructor(options: CaughtErrorOptions) {
    super();

    this.options = options;
  };
};

export default CaughtError;
