import Button from "@/components/Button";
import {
  Center,
  Column,
  Container,
  Expanded,
  Gutter,
  Section,
  Space,
} from "@/components/core";
import { RegularText, TitleLargeText } from "@/components/text";
import { scaleSize } from "@/utils/responsive";
import Image from "@/components/Image";
import { mutedColor } from "@/styles/colors";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";

export default function MainScreen() {
  const navigation = useNavigation<ScreenNavigationProp<"Main">>();

  return (
    <Container backgroundColor="white">
      <Column mainAlign="space-between" crossAlign="center">
        <Section>
          <Center>
            <TitleLargeText.Bold>Seja bem vindo</TitleLargeText.Bold>
          </Center>
        </Section>

        <Section>
          <Image
            height={scaleSize(66)}
            contentFit="contain"
            source={require("assets/illustrations/logo.svg")}
          />
          <Image
            height={scaleSize(235)}
            contentFit="contain"
            source={require("assets/illustrations/car_wash.svg")}
          />
          <Center>
            <RegularText.Medium color={mutedColor}>
              A melhor plataforma de estética veicular
            </RegularText.Medium>
          </Center>
        </Section>
        <Section>
          <Gutter space={8}>
            <Button
              outline
              title="Criar conta"
              onPress={() => navigation.navigate("Register")}
            />
            <Button
              title="Já tenho conta"
              onPress={() => navigation.navigate("Login")}
            />
          </Gutter>
        </Section>
      </Column>
    </Container>
  );
}
