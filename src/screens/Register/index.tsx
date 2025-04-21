import Button from "@/components/Button";
import {
  Align,
  Column,
  ContainerScrollable,
  Gutter,
  Row,
  Space,
} from "@/components/core";
import Image from "@/components/Image";
import Input from "@/components/Input";
import { InputProps } from "@/components/Input/types";
import { RegularText, TitleText, LinkText } from "@/components/text";
import { primaryColor } from "@/styles/colors";
import { scaleSize } from "@/utils/responsive";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

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
            {textAction}
          </LinkText>
        </Align>
      )}
    </Gutter>
  );
}

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ContainerScrollable
      backgroundColor="white"
      edges={["bottom"]}
      scroll={{ contentContainerStyle: { flexGrow: 1 } }}
    >
      <Column mainAlign="space-between" style={{ padding: 24 }}>
        

        <Space size={36} />

        <Image
          height={scaleSize(264)}
          contentFit="contain"
          source={require("assets/illustrations/Fill out-amico 1.svg")}
        />

        <Space size={16} />

        <Gutter space={29}>
          <InputControl label="Nome" placeholder="Seu nome completo" />
          <InputControl label="Contato" placeholder="(00) 9 0000 - 0000" />
          <InputControl label="Email" placeholder="exemplo@email.com" />

          <InputControl
            label="Senha"
            placeholder="* * * * * *"
            secureTextEntry={!showPassword}
            rightIcon={{
              family: MaterialCommunityIcons,
              name: showPassword ? "eye-outline" : "eye-off-outline",
              size: scaleSize(24),
              color: "black",
              onPress: () => setShowPassword(!showPassword),
            }}
          />

          <InputControl
            label="Confirmar senha"
            placeholder="* * * * * *"
            secureTextEntry={!showConfirmPassword}
            rightIcon={{
              family: MaterialCommunityIcons,
              name: showConfirmPassword ? "eye-outline" : "eye-off-outline",
              size: scaleSize(24),
              color: "black",
              onPress: () => setShowConfirmPassword(!showConfirmPassword),
            }}
          />
        </Gutter>

        <Space size={45} />

        <Button title="Cadastrar" onPress={() => {}} />

          <Space size={42}/>
      </Column>
    </ContainerScrollable>
  );
}
