export class BaseError extends Error {
  code!: string;
  originalError: unknown;
  constructor(code: string, message: string, originalError: unknown) {
    super(message);
    this.code = code;
    this.originalError = originalError;
  }
}
