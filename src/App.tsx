import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { SafeAreaView } from "react-native-safe-area-context";

function IllustrationWithLogo() {
  return (
    <View style={styles.illustrationWithLogo}>
      <Image
        style={styles.logo}
        source={require("assets/illustrations/logo.svg")}
      />
      <Image
        style={styles.banner}
        source={require("assets/illustrations/car_wash.svg")}
      />
      <Text style={styles.slogan}>
        A melhor plataforma de estética veicular
      </Text>
    </View>
  );
}

interface ButtonProps {
  title: string;
  outline?: boolean;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, props.outline ? styles.buttonOutline : null]}
    >
      <Text
        style={[
          styles.buttonText,
          props.outline ? styles.buttonOutlineText : null,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

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
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Seja bem vindo</Text>
        <IllustrationWithLogo />
        <View style={styles.buttonGroup}>
          <Button outline title="Criar conta" />
          <Button title="Já tenho conta" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 24,
  },
  header: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#000",
  },
  illustrationWithLogo: {
    alignItems: "center",
  },
  logo: {
    width: 155,
    height: 66,
    marginBottom: 8,
  },
  banner: {
    height: 235,
    alignSelf: "stretch",
  },
  slogan: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#00000080",
  },
  buttonGroup: {
    // flex: 1,
    // height: 116
    width: "100%",
  },
  button: {
    height: 49,
    width: "100%",
    backgroundColor: "#A47864",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    borderColor: "#A47864",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#A47864",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
});
