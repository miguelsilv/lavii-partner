import React, { useEffect, useRef } from "react";
import { Platform, KeyboardAvoidingView, Alert, ToastAndroid } from "react-native";
import { Button } from "@lavii/ds";
import { Container, Gutter, Column, ContainerScrollable, Space } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { InputControl } from "@/screens/Auth/Login/components";
import { usePersonalDataFormBase, getFirstErrorMessage } from "./logics";
import { useAuth } from "@/contexts/Auth";
import { Controller } from "react-hook-form";
import { ApiError } from "@/errors";
import { PersonalDataFormData } from "./validations";
import { alternativeColor } from "@lavii/ds";
import { useApiResource } from "@/hooks/useApiResource";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

export default function PersonalDataScreen() {
  const { data } = useAuth();
  const { partnersApi } = useApiResource();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  
  const { control, handleSubmit, formState, setError, nameRef, cpfRef, emailRef, phoneRef, birthdayRef } = usePersonalDataFormBase({
    name: data?.partner?.name,
    cpf: data?.partner?.cpf,
    email: data?.partner?.email,
    phone: data?.partner?.phone,
    birthday: data?.partner?.birthday,
  });

  const lastSubmitCount = useRef(0);

  const onSubmit = async (formData: PersonalDataFormData) => {
    try {
      const { email, phone, name, birthday, cpf } = formData;

      await partnersApi.updateMe({
        email,
        phone,
        personal: {
          name,
          birthday,
          cpf,
        },
      });

      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      
      if (Platform.OS === "android") {
        ToastAndroid.show("Dados atualizados com sucesso", ToastAndroid.BOTTOM);
      } else {
        Alert.alert("Sucesso", "Dados atualizados com sucesso");
      }
      
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao atualizar dados", err);
      if (err instanceof ApiError) {
        setError("root", { message: err.message });
        return;
      }
      setError("root", { message: "Erro ao atualizar dados" });
    }
  };

  const firstError = getFirstErrorMessage(formState.errors);

  useEffect(() => {
    if (firstError && formState.submitCount > lastSubmitCount.current) {
      lastSubmitCount.current = formState.submitCount;

      if (Platform.OS === "android") {
        ToastAndroid.show(firstError, ToastAndroid.BOTTOM);
      } else {
        Alert.alert(firstError);
      }
    }
  }, [firstError, formState.submitCount]);

  return (
    <ContainerScrollable backgroundColor={alternativeColor} withVerticalPadding>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Column mainAlign="space-between" fill>
          <Gutter space={16}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <InputControl
                  inputRef={nameRef}
                  label="Nome"
                  placeholder="Seu nome completo"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => cpfRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name="cpf"
              render={({ field }) => (
                <InputControl
                  inputRef={cpfRef}
                  label="CPF"
                  placeholder="000.000.000-00"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <InputControl
                  inputRef={phoneRef}
                  label="Telefone"
                  placeholder="(11) 99999-9999"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => birthdayRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <InputControl
                  inputRef={birthdayRef}
                  label="Data de nascimento"
                  placeholder="DD/MM/AAAA"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <InputControl
                  inputRef={emailRef}
                  label="Email"
                  placeholder="exemplo@email.com"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="done"
                />
              )}
            />
          </Gutter>

          <Space size={16} />
          <Gutter space={16}>
            <Button
              title={formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
              onPress={handleSubmit(onSubmit)}
              loading={formState.isSubmitting}
            />
          </Gutter>
        </Column>
      </KeyboardAvoidingView>
    </ContainerScrollable>
  );
}

