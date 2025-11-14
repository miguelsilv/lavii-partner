export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BaseError";
  }
}

interface IApiError {
  name: string;
  message: string;
  statusCode: number;
  details?: { message: string }[];
}

export class ApiError extends BaseError {
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor(error: IApiError) {
    console.log("ApiError constructor", JSON.stringify(error, null, 2));
    super(error.details?.[0]?.message ?? error.message);
    this.name = error.name ?? "ApiError";
    this.statusCode = error.statusCode;
    this.details = error.details ?? [];
  }
}
