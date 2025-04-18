import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import { MainScreen2 } from "./screens/MainScreen";
import RootNavigator from "./navigations/RootNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
