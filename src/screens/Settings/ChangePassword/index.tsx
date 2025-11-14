import React from "react";
import { Platform, KeyboardAvoidingView, Alert } from "react-native";
import { Button } from "@lavii/ds";
import { Container, Gutter, Column, ContainerScrollable, Space } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { InputControl } from "@/screens/Auth/Login/components";
import { useChangePasswordFormBase, usePasswordVisibility } from "./logics";
import { Controller } from "react-hook-form";
import { ChangePasswordFormData } from "./validations";
import { alternativeColor } from "@lavii/ds";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useApiResource } from "@/hooks/useApiResource";
import { useNavigation } from "@react-navigation/native";

export default function ChangePasswordScreen() {
  const { authApi } = useApiResource();
  const navigation = useNavigation();
  
  const { control, handleSubmit, formState, currentPasswordRef, newPasswordRef, confirmPasswordRef } = useChangePasswordFormBase();
  const { showCurrentPassword, setShowCurrentPassword, showNewPassword, setShowNewPassword, showConfirmPassword, setShowConfirmPassword } = usePasswordVisibility();

  const onSubmit = async (formData: ChangePasswordFormData) => {
    const { currentPassword, newPassword } = formData;

    const response = await authApi.changePassword(currentPassword, newPassword);
    
    if (response.error) {
      Alert.alert("Não foi possível alterar a senha", response.error.message);
      return;
    }
    
    Alert.alert("Sucesso", "Senha alterada com sucesso", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ContainerScrollable backgroundColor={alternativeColor} withVerticalPadding>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Column mainAlign="space-between" fill>
          <Gutter space={16}>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field }) => (
                <InputControl
                  inputRef={currentPasswordRef}
                  label="Senha atual"
                  placeholder="* * * * * *"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  secureTextEntry={!showCurrentPassword}
                  rightIcon={{
                    icon: () => (
                      <MaterialCommunityIcons
                        name={showCurrentPassword ? "eye-outline" : "eye-off-outline"}
                        size={scaleSize(24)}
                        color="black"
                      />
                    ),
                    onPress: () => setShowCurrentPassword((prev) => !prev)
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => newPasswordRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => (
                <InputControl
                  inputRef={newPasswordRef}
                  label="Nova senha"
                  placeholder="* * * * * *"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  secureTextEntry={!showNewPassword}
                  rightIcon={{
                    icon: () => (
                      <MaterialCommunityIcons
                        name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                        size={scaleSize(24)}
                        color="black"
                      />
                    ),
                    onPress: () => setShowNewPassword((prev) => !prev)
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <InputControl
                  inputRef={confirmPasswordRef}
                  label="Confirme a nova senha"
                  placeholder="* * * * * *"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  secureTextEntry={!showConfirmPassword}
                  rightIcon={{
                    icon: () => (
                      <MaterialCommunityIcons
                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                        size={scaleSize(24)}
                        color="black"
                      />
                    ),
                    onPress: () => setShowConfirmPassword((prev) => !prev)
                  }}
                  returnKeyType="done"
                />
              )}
            />
          </Gutter>

          <Space size={16} />
          <Gutter space={16}>
            <Button
              title={formState.isSubmitting ? "Alterando..." : "Alterar senha"}
              onPress={handleSubmit(onSubmit)}
              loading={formState.isSubmitting}
            />
          </Gutter>
        </Column>
      </KeyboardAvoidingView>
    </ContainerScrollable>
  );
}

