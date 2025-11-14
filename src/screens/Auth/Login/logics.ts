import { useRef, useState } from "react";
import { Alert, TextInput } from "react-native";
import { ApiError } from "@/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "./validations";

// Função pura para extrair a primeira mensagem de erro
export function getFirstErrorMessage(errors: any): string | undefined {
  if (errors.root?.message) return errors.root.message;
  if (errors.email?.message) return errors.email.message;
  if (errors.password?.message) return errors.password.message;
  return undefined;
}

// Handler isolado para forgot password
export function useForgotPasswordModal(setShowPrompt: (show: boolean) => void) {
  return () => setShowPrompt(true);
}

// Hook para controlar visibilidade da senha
export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);
  return { showPassword, setShowPassword };
}

// Hook para inicializar o formulário de login
export function useLoginFormBase() {
  const passwordRef = useRef<TextInput>(null);
  const { control, handleSubmit, formState, setError } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });
  return { control, handleSubmit, formState, setError, passwordRef };
}

// Handler isolado para submit
export function useLoginSubmit(
  setError: any,
  signIn: (email: string, password: string) => Promise<void>
) {
  return async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      console.debug("Login realizado com sucesso");
      // navigation.navigate("Home");
    } catch (err) {
      console.error("Erro ao fazer login", err);
      if (err instanceof ApiError) {
        setError("root", { message: err.message });
        return;
      }
      setError("root", { message: "Usuário ou senha inválidos" });
    }
  };
}
