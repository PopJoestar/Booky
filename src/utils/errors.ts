class BaseError extends Error {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly stack?: string,
  ) {
    super(message);
  }
}

export class HostError extends BaseError {
  constructor(
    readonly message: string,
    readonly hostname: string,
    readonly stack?: string,
  ) {
    super('HOST_ERROR', message, stack);
  }
}

export class HttpError extends BaseError {
  constructor(
    readonly code: 'CONNECTION_ERROR' | 'TIMEOUT_ERROR',
    readonly message: string,
    readonly stack?: string,
  ) {
    super(code, message, stack);
  }
}
