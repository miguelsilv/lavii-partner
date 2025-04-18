import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "./utils/styled";
import { scaleSize } from "./utils/responsive";
import { primaryColor } from "./styles/colors";
import Button from "./components/Button";
import MainScreen from "./screens";
import { MainScreen2 } from "./screens/MainScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return <MainScreen2 />;
}
