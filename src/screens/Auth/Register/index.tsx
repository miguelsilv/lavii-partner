import React, { useEffect, useRef, useState } from "react";
import { Platform, KeyboardAvoidingView, Alert, ToastAndroid } from "react-native";
import { Button } from "@lavii/ds";
import { Image } from "@lavii/ds";
import { Container, Expanded, Gutter, Column, ContainerScrollable, Space } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputControl } from "../Login/components";
import { useRegisterFormBase, usePasswordVisibility, getFirstErrorMessage } from "./logics";
import { useAuth } from "@/contexts/Auth";
import { Controller } from "react-hook-form";
import { ApiError } from "@/errors";
import { RegisterFormData } from "./validations";
import { RegularText } from "@lavii/ds";
import { mutedColor, primaryColor } from "@lavii/ds";
import { WebView } from "@lavii/ds";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export default function RegisterScreen() {
  const { control, handleSubmit, formState, setError, setFocus, nameRef, passwordRef, phoneRef, emailRef, cpfRef } = useRegisterFormBase();
  const { showPassword, setShowPassword } = usePasswordVisibility();
  const { signUp } = useAuth();
  const [webViewUrl, setWebViewUrl] = useState<string>("");
  const [webViewVisible, setWebViewVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(-100);
  const lastSubmitCount = useRef(0);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { email, phone, password, ...personal } = data;

      await signUp({
        email, phone, password, personal,
      });
      console.debug("Cadastro realizado com sucesso");
    } catch (err) {
      console.error("Erro ao fazer cadastro", err);
      if (err instanceof ApiError) {
        setError("root", { message: err.message });
        return;
      }
      setError("root", { message: "Erro ao realizar cadastro" });
    }
  };

  const firstError = getFirstErrorMessage(formState.errors);

  useEffect(() => {
    if (firstError?.message && formState.submitCount > lastSubmitCount.current) {
      lastSubmitCount.current = formState.submitCount;

      const fieldName = (firstError.ref as any)?.name;
      setFocus(fieldName as keyof RegisterFormData);

      if (Platform.OS === "android") {
        ToastAndroid.show(firstError.message, ToastAndroid.BOTTOM);
      } else {
        Alert.alert(firstError.message);
      }
    }
  }, [firstError, formState.submitCount, formState.errors, setFocus]);

  const handleOpenTerms = () => {
    setWebViewUrl("https://carambole.tech/terms");
    setWebViewVisible(true);
  };

  const handleOpenPrivacy = () => {
    setWebViewUrl("https://carambole.tech/lgpd");
    setWebViewVisible(true);
  };

  const handleCloseWebView = () => {
    setWebViewVisible(false);
    setWebViewUrl("");
  };

  return (
    <ContainerScrollable backgroundColor="white" withVerticalPadding="bottom">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined} contentContainerStyle={{ flexGrow: 1 }} keyboardVerticalOffset={keyboardVerticalOffset} >
        <Column mainAlign="space-between" fill>
          <Image
            height={scaleSize(180)}
            contentFit="contain"
            source={require("@/assets/images/illustrations/register.svg")}
          />
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
                  onPressIn={() => setKeyboardVerticalOffset(-100)}
                  onBlur={field.onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus("cpf")}
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
                  onFocus={() => setKeyboardVerticalOffset(-100)}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus("email")}
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
                  onFocus={() => setKeyboardVerticalOffset(0)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus("phone")}
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
                  onSubmitEditing={() => setFocus("password")}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputControl
                  inputRef={passwordRef}
                  label="Senha"
                  placeholder="* * * * * *"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  onFocus={() => setKeyboardVerticalOffset(100)}
                  secureTextEntry={!showPassword}
                  rightIcon={{
                    icon: () => (
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={scaleSize(24)}
                        color="black"
                      />
                    ),
                    onPress: () => setShowPassword((prev) => !prev)
                  }}
                  returnKeyType="done"
                />
              )}
            />
          </Gutter>
        </Column>


        <Space size={16} />
        <Gutter space={16}>
          <RegularText size={12} color={mutedColor}>
            Ao se cadastrar, você concorda com nossos{" "}
            <RegularText size={12} color={primaryColor} onPress={handleOpenTerms}>
              Termos de Uso
            </RegularText>
            {" "}e{" "}
            <RegularText size={12} color={primaryColor} onPress={handleOpenPrivacy}>
              Política de Privacidade
            </RegularText>
          </RegularText>
          <Button
            title={formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
            onPress={handleSubmit(onSubmit)}
          />
        </Gutter>
      </KeyboardAvoidingView>
      <WebView
        url={webViewUrl}
        visible={webViewVisible}
        onClose={handleCloseWebView}
      />
    </ContainerScrollable>
  );
} 