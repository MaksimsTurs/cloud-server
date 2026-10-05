import type { SagaPatternConstructorOptions, SagaCallback } from "./Saga-Pattern.type";

export default class SagaPattern {
  public constructor(options: SagaPatternConstructorOptions) {
    this.options = options;
  };

  public add(step: SagaCallback, compensate: SagaCallback): this {
    this.steps.push(step);
    this.compensates.push(compensate);
    
    return this;
  };

  public async execute(): Promise<SagaPatternResult> {
    while(this.stepIndex < this.steps.length) {
      const step: SagaCallback = this.steps[this.stepIndex]!;

      try {
        await step();
        this.stepIndex++;
      } catch(stepError) {
        this.errors.push(stepError as Error);
        const { stepRetryCount } = this.options;
        const stepRetryError: Error | null = await this.retry(step, stepRetryCount);

        if(stepRetryError) {
          this.errors.push(stepRetryError);
          await this.tryCompensate();
          break;
        }

        this.stepIndex++;
      }
    }

    return new SagaPatternResult(this.errors);
  };

  private async tryCompensate(): Promise<void> {     
    const { compensateRetryCount } = this.options;
    
    while(this.stepIndex >= 0) {
      const compensate: SagaCallback = this.compensates[this.stepIndex]!;

      try {
        await compensate();
        this.stepIndex--;
      } catch(compensateError) {
        this.errors.push(compensateError as Error);
        const compensateRetryError: Error | null = await this.retry(compensate, compensateRetryCount);
              
        if(compensateRetryError) {
          this.errors.push(compensateRetryError);
          break;
        }
      }
    }
  };

  private async retry(callback: SagaCallback, maxCount: number): Promise<Error | null> {
    let error: Error | null = null;

    for(let count: number = 0; count < maxCount; count++) {
      try {
        await callback();
        return null;
      } catch(retryError) {
        error = retryError as Error;
      }
    }

    return error;
  };

  private stepIndex: number = 0;
  private errors: Error[] = [];
  private steps: SagaCallback[] = [];
  private compensates: SagaCallback[] = [];
  private options: SagaPatternConstructorOptions
};

class SagaPatternResult {
  public constructor(errors: Error[]) {
    this.errors = errors;
  };

  public throw(): void {
    const firstError: Error | undefined = this.errors.at(-1);

    if(firstError) {
      throw firstError;
    }
  };

  private errors: Error[];
};
