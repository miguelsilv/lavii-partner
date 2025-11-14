import React, { useEffect, useState } from "react";
import { Platform, KeyboardAvoidingView, Alert, ToastAndroid, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "@lavii/ds";
import { Image } from "@lavii/ds";
import { Container, Expanded, Gutter, Column, ContainerScrollable, Space } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputControl } from "./components";
import {
    useLoginFormBase,
    usePasswordVisibility,
    useLoginSubmit,
    getFirstErrorMessage,
    useForgotPasswordModal
} from "./logics";
import { useAuth } from "@/contexts/Auth";
import { Controller } from "react-hook-form";
import { PromptModal } from "@lavii/ds";
import { ApiError } from "@/errors";
import { LoginFormData } from "./validations";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApiNoAuthResource } from "@/hooks/useApiNoAuthResource";

export default function LoginScreen() {
    const { control, handleSubmit, formState, setError, passwordRef } = useLoginFormBase();
    const { showPassword, setShowPassword } = usePasswordVisibility();
    const { signIn } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { authApi } = useApiNoAuthResource();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await signIn(data.email, data.password);
            console.debug("Login realizado com sucesso");
        } catch (err) {
            console.error("Erro ao fazer login", err);
            if (err instanceof ApiError) {
                setError("root", { message: err.message });
                return;
            }
            setError("root", { message: "Usuário ou senha inválidos" });
        }
    };
    const firstError = getFirstErrorMessage(formState.errors);

    const [showPrompt, setShowPrompt] = useState(false);
    const [isLoadingForgot, setIsLoadingForgot] = useState(false);
    const handleForgotPassword = useForgotPasswordModal(setShowPrompt);

    const handlePromptSubmit = async (email: string) => {
        setIsLoadingForgot(true);
        try {
            const response = await authApi.forgotPassword(email);
            
            if (response.error) {
                throw response.error;
            }

            setShowPrompt(false);
            
            if (Platform.OS === "android") {
                ToastAndroid.show(response.data?.message || "Código enviado para seu email", ToastAndroid.LONG);
            } else {
                Alert.alert("Sucesso", response.data?.message || "Código enviado para seu email");
            }

            navigation.navigate("ResetPassword", { email });
        } catch (err) {
            console.error("Erro ao solicitar recuperação de senha", err);
            if (err instanceof ApiError) {
                if (Platform.OS === "android") {
                    ToastAndroid.show(err.message, ToastAndroid.LONG);
                } else {
                    Alert.alert("Erro", err.message);
                }
                return;
            }
            if (Platform.OS === "android") {
                ToastAndroid.show("Erro ao solicitar recuperação de senha", ToastAndroid.LONG);
            } else {
                Alert.alert("Erro", "Erro ao solicitar recuperação de senha");
            }
        } finally {
            setIsLoadingForgot(false);
        }
    };

    useEffect(() => {
        if (firstError) {
            if (Platform.OS === "android") {
                ToastAndroid.show(firstError, ToastAndroid.BOTTOM);
            } else {
                Alert.alert(firstError);
            }
        }
    }, [firstError, formState.submitCount]);

    return (
        <ContainerScrollable backgroundColor="white" withVerticalPadding="bottom">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardVerticalOffset={40}>
                <Column mainAlign="space-between" fill>
                        <Image
                            height={scaleSize(342)}
                            contentFit="contain"
                            source={require("@/assets/images/illustrations/authentication.svg")}
                        />
                        <Gutter space={16}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <InputControl
                                        label="Email"
                                        placeholder="exemplo@email.com"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
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
                                        textAction="Esqueceu a senha?"
                                        onPressTextAction={handleForgotPassword}
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
                    <Space size={32} />
                    <Button title={formState.isSubmitting ? "Entrando..." : "Acessar"} onPress={handleSubmit(onSubmit)} />
                </Column>
            </KeyboardAvoidingView>
            <PromptModal
                visible={showPrompt}
                title="Recuperação de senha"
                message="Informe seu email para recuperar a senha."
                onCancel={() => setShowPrompt(false)}
                onSubmit={handlePromptSubmit}
            />
        </ContainerScrollable>
    );
}