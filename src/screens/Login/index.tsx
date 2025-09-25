import Button from "@/components/Button";
import {
  Align,
  Column,
  ContainerScrollable,
  Gutter,
} from "@/components/core";
import Image from "@/components/Image";
import Input from "@/components/Input";
import { InputProps } from "@/components/Input/types";
import { RegularText, LinkText } from "@/components/text";
import { primaryColor } from "@/styles/colors";
import { scaleSize } from "@/utils/responsive";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

interface InputControlProps extends InputProps {
  label: string;
  textAction?: string;
  onPressTextAction?: () => void;
}

function InputControl({
  label,
  textAction,
  onPressTextAction,
  ...props
}: InputControlProps) {
  return (
    <Gutter space={8}>
      <RegularText>{label}</RegularText>
      <Input {...props} />
      {textAction && (
        <Align alignment="centerRight">
          <LinkText color={primaryColor} onPress={onPressTextAction}>
            Esqueceu a senha?
          </LinkText>
        </Align>
      )}
    </Gutter>
  );
}

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ContainerScrollable
      backgroundColor="white"
      edges={["bottom"]}
      scroll={{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Column mainAlign="space-between">
        <Image
          height={scaleSize(342)}
          contentFit="contain"
          source={require("assets/illustrations/authentication.svg")}
        />
        <Gutter space={16}>
          <InputControl label="Email" placeholder="exemplo@email.com" />
          <InputControl
            label="Senha"
            placeholder="* * * * * *"
            textAction="Esqueceu a senha?"
            onPressTextAction={() => {
              Alert.prompt(
                "Recuperação de senha",
                "Informe seu email para recuperar a senha",
                (text) => { }
              );
            }}
            secureTextEntry={!showPassword}
            rightIcon={{
              family: MaterialCommunityIcons,
              name: showPassword ? "eye-outline" : "eye-off-outline",
              size: scaleSize(24),
              color: "black",
              onPress: () => setShowPassword(!showPassword),
            }}
          />
        </Gutter>

        <Button title="Acessar" onPress={() => { }} />
      </Column>
    </ContainerScrollable>
  );
}
