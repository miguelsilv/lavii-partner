import { useMemo } from "react";
import { FetchHttpClient } from "@/api/FetchHttpClient";
import { AuthApi } from "@/api/requests/AuthApi";
import { API_URL } from "@/constants/api.consts";

export function useApiNoAuthResource() {
  const services = useMemo(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    const httpClient = new FetchHttpClient({
      baseUrl: API_URL,
      headers,
    });

    return {
      authApi: new AuthApi(httpClient),
    };
  }, []);

  return services;
}
