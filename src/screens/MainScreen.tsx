import Button from "@/components/Button";
import {
  Align,
  Center,
  Column,
  Container,
  Expanded,
  Gutter,
  Section,
  Space,
} from "@/components/core";
import { TitleLargeText } from "@/components/text";
import { View, Text } from "react-native";

export function MainScreen2() {
  return (
    <Container>
      <Center>
        <TitleLargeText.Bold>Seja bem vindo</TitleLargeText.Bold>

        <Expanded>
          <Center>
            <TitleLargeText>Lavii</TitleLargeText>
          </Center>
        </Expanded>

        <Column>
          <Button
            outline
            title="Criar conta"
            onPress={() => alert("Botão pressionado!")}
          />
          <Space />
          <Button
            title="Já tenho conta"
            onPress={() => alert("Outline pressionado!")}
          />
        </Column>
      </Center>
    </Container>
  );
}
