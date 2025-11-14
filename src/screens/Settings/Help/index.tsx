import { Center, Container, Gutter, Space } from "@lavii/ds";
import { DisplayText, RegularText, TitleLargeText } from "@lavii/ds";
import { alternativeColor, primaryColor } from "@lavii/ds";
import { Octicons } from "@expo/vector-icons";
import { scaleSize } from "@lavii/ds";

export default function HelpScreen() {
  return (
    <Container backgroundColor={alternativeColor} withVerticalPadding edges={{ top: "off", bottom: "maximum" }}>
      <Gutter space={32}>
        <Center>
          <Octicons name="report" size={scaleSize(80)} color={primaryColor} />
        </Center>
        
        <Space size={scaleSize(16)} />
        
        <TitleLargeText.Bold textAlign="center" color={primaryColor}>
          Como podemos ajudar?
        </TitleLargeText.Bold>
        
        <Space size={scaleSize(8)} />
        
        <RegularText textAlign="center">
          Para solicitações de ajuda, dúvidas ou suporte, entre em contato conosco através do email:
        </RegularText>
        
        <Space size={scaleSize(24)} />
        
        <Center>
          <TitleLargeText.Bold numberOfLines={1} adjustsFontSizeToFit color={primaryColor}>
            suport-lavi@carambole.tech
          </TitleLargeText.Bold>
        </Center>
        
        <Space size={scaleSize(16)} />
        
        <RegularText textAlign="center">
          Nossa equipe retornará o mais breve possível.
        </RegularText>
      </Gutter>
    </Container>
  );
}

