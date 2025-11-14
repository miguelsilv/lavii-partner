import { useRef, useState, useCallback } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "./validations";
import { TextInput } from "react-native";

export function useRegisterFormBase() {
  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpf: "",
    },
  });

  // Mapeamento dos campos para suas respectivas refs
  const fieldRefs = {
    name: nameRef,
    cpf: cpfRef,
    email: emailRef,
    phone: phoneRef,
    password: passwordRef,
  };

  // Função personalizada de setFocus que funciona com as refs
  const setFocus = useCallback((fieldName: keyof RegisterFormData) => {
    const ref = fieldRefs[fieldName];
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);

  return {
    ...form,
    setFocus, // Sobrescreve o setFocus padrão do React Hook Form
    nameRef,
    passwordRef,
    phoneRef,
    emailRef,
    cpfRef,
  };
}

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);
  return { showPassword, setShowPassword };
}

export function getFirstErrorMessage(errors: FieldErrors<RegisterFormData>) {
  if (!errors) return null;
  
  const firstError = Object.values(errors)[0];
  if (!firstError) return null;
  
  return firstError;
} 