export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly code = 'API_ERROR',
    readonly status?: number,
    readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}
