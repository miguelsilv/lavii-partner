import React, { useEffect } from "react";
import { Platform, KeyboardAvoidingView, Alert, ToastAndroid } from "react-native";
import { Button } from "@lavii/ds";
import { Image } from "@lavii/ds";
import { Gutter, Column, ContainerScrollable, Space } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputControl } from "../Login/components";
import {
    useResetPasswordFormBase,
    usePasswordVisibility,
    getFirstErrorMessage,
} from "./logics";
import { Controller } from "react-hook-form";
import { ApiError } from "@/errors";
import { ResetPasswordFormData } from "./validations";
import { useNavigation, useRoute, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApiNoAuthResource } from "@/hooks/useApiNoAuthResource";

export default function ResetPasswordScreen() {
    const { control, handleSubmit, formState, setError, passwordRef, confirmPasswordRef } = useResetPasswordFormBase();
    const { showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword } = usePasswordVisibility();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute();
    const { email } = route.params as { email: string };
    const { authApi } = useApiNoAuthResource();

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            const response = await authApi.resetPassword(email, data.code, data.password);
            
            if (response.error) {
                throw response.error;
            }

            if (Platform.OS === "android") {
                ToastAndroid.show("Senha redefinida com sucesso!", ToastAndroid.LONG);
            } else {
                Alert.alert("Sucesso", "Senha redefinida com sucesso!");
            }

            navigation.navigate("Login");
        } catch (err) {
            console.error("Erro ao redefinir senha", err);
            if (err instanceof ApiError) {
                setError("root", { message: err.message });
                return;
            }
            setError("root", { message: "Erro ao redefinir senha. Tente novamente." });
        }
    };

    const firstError = getFirstErrorMessage(formState.errors);

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
                        source={require("@/assets/images/illustrations/fingerprint.svg")}
                    />
                    <Gutter space={16}>
                        <Controller
                            control={control}
                            name="code"
                            render={({ field }) => (
                                <InputControl
                                    label="Código"
                                    placeholder="000000"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    keyboardType="numeric"
                                    maxLength={6}
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
                                    label="Nova Senha"
                                    placeholder="* * * * * *"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
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
                                    label="Confirmar Nova Senha"
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
                    <Space size={32} />
                    <Button 
                        title={formState.isSubmitting ? "Redefinindo..." : "Redefinir Senha"} 
                        onPress={handleSubmit(onSubmit)} 
                    />
                </Column>
            </KeyboardAvoidingView>
        </ContainerScrollable>
    );
}



