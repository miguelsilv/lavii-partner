import Button from "@/components/Button";
import { Center, Column, Container, Expanded, Space } from "@/components/core";
import { RegularText, TitleLargeText } from "@/components/text";
import { scaleSize } from "@/utils/responsive";
import Image from "@/components/Image";
import { mutedColor } from "@/styles/colors";

export default function MainScreen() {
  return (
    <Container>
      <Center>
        <TitleLargeText.Bold>Seja bem vindo</TitleLargeText.Bold>

        <Expanded>
          <Center>
            <Image
              height={scaleSize(66)}
              width={scaleSize(155)}
              contentFit="contain"
              source={require("assets/illustrations/logo.svg")}
            />
            <Image
              height={scaleSize(235)}
              width="100%"
              contentFit="contain"
              source={require("assets/illustrations/car_wash.svg")}
            />
            <RegularText.Medium color={mutedColor}>
              A melhor plataforma de estética veicular
            </RegularText.Medium>
          </Center>
        </Expanded>
        <Column>
          <Button outline title="Criar conta" onPress={() => {}} />
          <Space />
          <Button title="Já tenho conta" onPress={() => {}} />
        </Column>
      </Center>
    </Container>
  );
}
