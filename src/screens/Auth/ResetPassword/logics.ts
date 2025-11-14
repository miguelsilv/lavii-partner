import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "./validations";

export function getFirstErrorMessage(errors: any): string | undefined {
  if (errors.root?.message) return errors.root.message;
  if (errors.code?.message) return errors.code.message;
  if (errors.password?.message) return errors.password.message;
  if (errors.confirmPassword?.message) return errors.confirmPassword.message;
  return undefined;
}

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return { showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword };
}

export function useResetPasswordFormBase() {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { control, handleSubmit, formState, setError } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });
  return { control, handleSubmit, formState, setError, passwordRef, confirmPasswordRef };
}



