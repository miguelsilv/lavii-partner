import { ApiError } from "@/errors";
import { IApiResponse, IHttpClient } from "./IHttpClient";

export interface IHttpInterceptor {
  intercept<T>(error: ApiError | null, data?: T, callback?: () => void): void;
}

export class FetchHttpClient implements IHttpClient {
  private headers: { [key: string]: string };
  private baseUrl?: string;
  private interceptor?: IHttpInterceptor;

  constructor(config: {
    headers?: { [key: string]: string };
    baseUrl?: string;
    interceptor?: IHttpInterceptor;
    key?: string;
  }) {
    this.headers = config.headers ?? { "Content-Type": "application/json" };
    this.baseUrl = config.baseUrl;
    this.interceptor = config.interceptor;
  }

  public setHeaders(headers: { [key: string]: string }) {
    this.headers = headers;
  }

  public getHeaders() {
    return this.headers;
  }

  private async request<T>(
    url: string,
    method: string,
    data?: unknown,
    headers?: { [key: string]: string },
    signal?: AbortSignal
  ): Promise<IApiResponse<T>> {
    let requestHeaders = { ...this.headers, ...headers };

    if (!data) {
      const { "Content-Type": _, ...headersWithoutContentType } =
        requestHeaders;
      requestHeaders = headersWithoutContentType;
    }

    const options: RequestInit = {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
      ...(signal ? { signal } : {}),
    };

    const response = await fetch(`${this.baseUrl ?? ""}${url}`, options);

    return response.json().then((data) => {
      const result = {
        status: response.status,
        statusText: response.statusText,
      };

      if (!response.ok) {
        let error: ApiError;
        if (data.error) {
          error = new ApiError(data.error);
        } else {
          error = new ApiError({
            name: "ApiError",
            message: data.message ?? "Erro desconhecido",
            statusCode: response.status,
          });
        }
        if (this.interceptor) {
          this.interceptor.intercept(error);
        }
        return { ...result, data: null, error };
      }

      if (this.interceptor) {
        this.interceptor.intercept(null, data);
      }

      return { ...result, data: data as T };
    });
  }

  public get<T>(
    url: string,
    headers?: { [key: string]: string },
    signal?: AbortSignal
  ) {
    return this.request<T>(url, "GET", undefined, headers, signal);
  }

  public post<T>(
    url: string,
    data?: unknown,
    headers?: { [key: string]: string },
    signal?: AbortSignal
  ): Promise<IApiResponse<T>> {
    return this.request<T>(url, "POST", data, headers, signal);
  }

  public put<T>(
    url: string,
    data?: unknown,
    headers?: { [key: string]: string },
    signal?: AbortSignal
  ) {
    return this.request<T>(url, "PUT", data, headers, signal);
  }

  public patch<T>(
    url: string,
    data?: unknown,
    headers?: { [key: string]: string },
    signal?: AbortSignal
  ): Promise<IApiResponse<T>> {
    return this.request<T>(url, "PATCH", data, headers, signal);
  }

  public delete<T>(
    url: string,
    headers?: { [key: string]: string },
    signal?: AbortSignal
  ) {
    return this.request<T>(url, "DELETE", undefined, headers, signal);
  }
}
