import { useRef } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDataFormData, personalDataSchema } from "./validations";
import { TextInput } from "react-native";

export function usePersonalDataFormBase(defaultValues?: Partial<PersonalDataFormData>) {
  const nameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const birthdayRef = useRef<TextInput>(null);

  const form = useForm<PersonalDataFormData>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      cpf: defaultValues?.cpf || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      birthday: defaultValues?.birthday || "",
    },
  });

  return {
    ...form,
    nameRef,
    cpfRef,
    emailRef,
    phoneRef,
    birthdayRef,
  };
}

export function getFirstErrorMessage(errors: any): string | undefined {
  const firstKey = Object.keys(errors)[0];
  if (firstKey) {
    return errors[firstKey]?.message;
  }
  return undefined;
}

