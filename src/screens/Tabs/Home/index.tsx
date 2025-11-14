import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/contexts/Auth";
import { alternativeColor, primaryColor, Center, Container, SubtitleText, Image } from "@lavii/ds";

function Switch() {
  return (
    <View />
  )
}

export default function HomeScreen() {
  const { data, loading } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  if (loading) return (
    <Container backgroundColor={alternativeColor} withVerticalPadding edges={{ top: "maximum", bottom: "maximum" }}>
      <Center>
        <ActivityIndicator size="large" color={primaryColor} />
      </Center>
    </Container>
  );

  return (
    <Container backgroundColor={alternativeColor} withVerticalPadding edges={{ top: "maximum", bottom: "maximum" }}>
      <SubtitleText.Medium>Olá, {data?.partner?.name}</SubtitleText.Medium>


      <Image
        style={{ flex: 1 }}
        source={require("@/assets/images/illustrations/car-location.svg")}
        contentFit="contain"
      />

    </Container>
  );
}
