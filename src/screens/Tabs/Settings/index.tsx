
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { alternativeColor, blackColor, primaryColor, primaryMiddleColor } from "@lavii/ds";
import { useState } from "react";
import { useAuth } from "@/contexts/Auth";
import { Center, Container, Row, Space } from "@lavii/ds";
import { styled } from "@lavii/ds";
import { Dimensions, TouchableOpacity, View, ViewProps } from "react-native";
import { scaleSize } from "@lavii/ds";
import { DisplayLargeText, RegularText, SubtitleText, TitleLargeText } from "@lavii/ds";
import { ShapeRoundedBackground } from "@lavii/ds";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const AvatarSection = styled(View, (props) => ({
  backgroundColor: primaryMiddleColor,
  height: "40%",
  width: SCREEN_WIDTH,
  position: "absolute",
}));

const MenuSection = styled(View, (props) => ({
  marginTop: scaleSize(SCREEN_HEIGHT * 0.25),
  paddingVertical: scaleSize(8),
}));

const MenuItemContainer = styled(TouchableOpacity, (props) => ({
  paddingHorizontal: scaleSize(24),
}));

const Divider = styled(View, (props) => ({
  height: 2,
  backgroundColor: primaryColor,
  marginVertical: scaleSize(16),
}));


function Avatar({ name }: { name: string }) {
  return (
    <ShapeRoundedBackground size={100} backgroundColor={alternativeColor}>
      <DisplayLargeText color={primaryColor}>{name.charAt(0).toUpperCase()}</DisplayLargeText>
    </ShapeRoundedBackground>
  )
}

function MenuItem({ title, icon, onPress }: { title: string, icon: () => React.ReactNode, onPress: () => void }) {
  return (
    <MenuItemContainer onPress={onPress}>
      <Row mainAlign="space-between" crossAlign="center">
        <Row crossAlign="center" crossGap={scaleSize(36)}>
          {icon()}
          <SubtitleText.Medium color={blackColor} textAlign="left">{title}</SubtitleText.Medium>
        </Row>
        <Octicons name="chevron-right" size={24} color={primaryColor} />
      </Row>
    </MenuItemContainer>
  )
}

export default function SettingsScreen() {
  const { signOut, data } = useAuth();
  const navigation = useNavigation();

  const userName = data?.partner?.name || "Usuário";

  return (
    <Container backgroundColor={alternativeColor} edges={{ top: "maximum", bottom: "maximum" }}>
      <AvatarSection >
        <Center>
          <Avatar name={userName} />
        </Center>
      </AvatarSection>
      <MenuSection >
        <TitleLargeText.Bold textAlign="center" color={primaryColor}>{userName}</TitleLargeText.Bold>
        <Space size={scaleSize(36)} />
        <MenuItem
          title="Dados pessoais"
          icon={() => <Octicons name="person" size={24} color={primaryColor} />}
          onPress={() => navigation.navigate("PersonalData" as never)} />
        <Divider />
        <MenuItem
          title="Alterar senha"
          icon={() => <Octicons name="key" size={24} color={primaryColor} />}
          onPress={() => navigation.navigate("ChangePassword" as never)} />
        <Divider />
        <MenuItem
          title="Ajuda"
          icon={() => <Octicons name="report" size={24} color={primaryColor} />}
          onPress={() => navigation.navigate("Help" as never)} />
        <Divider />
        <MenuItem
          title="Sair"
          icon={() => <Octicons name="sign-out" size={24} color={primaryColor} />}
          onPress={signOut} />
      </MenuSection>
    </Container>
  );
}
