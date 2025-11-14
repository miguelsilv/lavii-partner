import { ApiError } from "@/errors";
import { IHttpInterceptor } from "@/api/FetchHttpClient";
import { Alert } from "react-native";

export default class AppHttpErrorInterceptor implements IHttpInterceptor {
  constructor(private onUnauthorized: () => void) {}

  intercept<T>(error: ApiError | null, _data?: T) {
    if (error?.statusCode === 401) {
      Alert.alert("Sua sessão expirou", "Por favor, faça login novamente.");
      this.onUnauthorized();
    } else if (error?.name === "InternalServerError") {
      Alert.alert("Problemas técnicos", "Por favor, tente novamente mais tarde.");
    }
    // Pode tratar outros erros (http) globais aqui
  }
}
