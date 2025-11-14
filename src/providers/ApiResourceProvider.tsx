import React, { createContext, useMemo } from "react";
import { FetchHttpClient, IHttpInterceptor } from "@/api/FetchHttpClient";
import { PartnersApi } from "@/api/requests/PartnersApi";
import { OrderApi } from "@/api/requests/OrderApi";
import { AuthApi } from "@/api/requests/AuthApi";
import { IApiResponse } from "@/api/IHttpClient";
import { API_URL } from "@/constants/api.consts";

interface ApiResourceContextData {
  partnersApi: PartnersApi;
  orderApi: OrderApi;
  authApi: AuthApi;
  defaultApiResponse: (params?: Partial<IApiResponse<any>>, signal?: AbortSignal) => Promise<IApiResponse<any>>;
}

export const ApiResourceContext = createContext<ApiResourceContextData | null>(null);

interface ApiResourceProviderProps {
  token?: string;
  children: React.ReactNode;
  interceptor?: IHttpInterceptor;
}

export function ApiResourceProvider({ token, children, interceptor }: ApiResourceProviderProps) {
  const services = useMemo(() => {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const httpClient = new FetchHttpClient({
      key: "api-resource",
      baseUrl: API_URL,
      headers,
      interceptor
    });

    return {
      partnersApi: new PartnersApi(httpClient),
      orderApi: new OrderApi(httpClient),
      authApi: new AuthApi(httpClient),
      defaultApiResponse: (params?: Partial<IApiResponse<any>>) =>
        Promise.resolve({ data: null, status: 200, statusText: 'OK', ...params })
    };
  }, [token, interceptor]);

  return <ApiResourceContext.Provider value={services}>{children}</ApiResourceContext.Provider>;
}
