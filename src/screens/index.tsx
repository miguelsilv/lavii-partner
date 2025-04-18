import { primaryColor } from "@/styles/colors";
import { scaleSize } from "@/utils/responsive";
import React from "react";
import { SafeAreaView, View, Text ,StyleSheet} from "react-native";
import { Image } from "expo-image";
import Button from "@/components/Button";


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


export default function MainScreen(){
return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Seja bem vindo</Text>
        <IllustrationWithLogo />
        <View style={styles.buttonGroup}>
          <Button outline title="Criar conta" onPress={() => alert("Botão pressionado!")} />
          <Button title="Já tenho conta" onPress={() => alert("Outline pressionado!")}/>
        </View>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    safe: {
      flex:1,
    },
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      margin: scaleSize(24),
    },
    header: {
      fontFamily: "Poppins_700Bold",
      fontSize: scaleSize(24),
      color: "#000",
    },
    illustrationWithLogo: {
      alignItems: "center",
    },
    logo: {
      width: scaleSize(155),
      height: scaleSize(66),
      marginBottom: scaleSize(8),
    },
    banner: {
      height: scaleSize(235),
      width: scaleSize(300),
    },
    slogan: {
      fontFamily: "Poppins_500Medium",
      fontSize: scaleSize(14),
      color: "#00000080",
    },
    buttonGroup: {
      width: "100%",
    },
    button: {
      height: scaleSize(49),
      width: "100%",
      backgroundColor: primaryColor,
      borderRadius: scaleSize(10),
      alignItems: "center",
      justifyContent: "center",
      marginTop: scaleSize(16),
    },
    buttonOutline: {
      backgroundColor: "#fff",
      borderColor: "#A47864",
      borderWidth: scaleSize(2),
    },
    buttonOutlineText: {
      color: "#A47864",
    },
    buttonText: {
      color: "#fff",
      fontFamily: "Poppins_500Medium",
      fontSize: scaleSize(16),
    },
  });
  