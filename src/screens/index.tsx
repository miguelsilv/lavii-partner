import { Center, Column, Container, Expanded, Space } from "@lavii/ds";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@lavii/ds";

import { DisplayLargeText, RegularText, TitleLargeText } from "@lavii/ds";
import { mutedColor, primaryColor } from "@lavii/ds";
import { Image } from "@lavii/ds";

export default function MainScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Container backgroundColor="white" withVerticalPadding edges={{ top: "maximum", bottom: "maximum" }}>
      <Column fill>
        <TitleLargeText textAlign="center">Seja bem vindo </TitleLargeText>
        <Expanded>
          <Center>
            {/* <DisplayLargeText color={primaryColor}>LAVII</DisplayLargeText> */}
            <Image
              height={65}
              contentFit="contain"
              source={require("@/assets/images/illustrations/logo.svg")} />
            <Image
              height={235}
              contentFit="contain"
              source={require("@/assets/images/illustrations/car-wash.svg")} />
            <Space />
            <RegularText color={mutedColor}>
              A melhor plataforma de estética veicular
            </RegularText>
          </Center>
        </Expanded>
        <Column crossAlign="stretch">
          <Button title="Criar conta" outline onPress={() => navigation.navigate("Register")} />
          <Space />
          <Button
            title="Já tenho conta"
            onPress={() => navigation.navigate("Login")}
          />
        </Column>
      </Column>
    </Container>
  );
}
