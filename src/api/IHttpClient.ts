export interface IApiResponse<T> {
  data: T | null;
  status: number;
  statusText: string;
  error?: Error;
}

export interface IHttpClient {
  getHeaders(): { [key: string]: string };
  get<T>(url: string, headers?: { [key: string]: string }, signal?: AbortSignal): Promise<IApiResponse<T>>;
  post<T>(url: string, data?: unknown, headers?: { [key: string]: string }, signal?: AbortSignal): Promise<IApiResponse<T>>;
  put<T>(url: string, data?: unknown, headers?: { [key: string]: string }, signal?: AbortSignal): Promise<IApiResponse<T>>;
  patch<T>(url: string, data?: unknown, headers?: { [key: string]: string }, signal?: AbortSignal): Promise<IApiResponse<T>>;
  delete<T>(url: string, headers?: { [key: string]: string }, signal?: AbortSignal): Promise<IApiResponse<T>>;
}
