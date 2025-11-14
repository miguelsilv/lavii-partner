import { useRef, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordFormData, changePasswordSchema } from "./validations";
import { TextInput } from "react-native";

export function useChangePasswordFormBase() {
  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return {
    ...form,
    currentPasswordRef,
    newPasswordRef,
    confirmPasswordRef,
  };
}

export function usePasswordVisibility() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return {
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}

export function getFirstErrorMessage(errors: any): string | undefined {
  const firstKey = Object.keys(errors)[0];
  if (firstKey) {
    return errors[firstKey]?.message;
  }
  return undefined;
}

