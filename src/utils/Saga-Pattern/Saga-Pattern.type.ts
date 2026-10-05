export type SagaPatternConstructorOptions = {
  stepRetryCount: number
  compensateRetryCount: number
};

export type SagaCallback = () => Promise<void>;
