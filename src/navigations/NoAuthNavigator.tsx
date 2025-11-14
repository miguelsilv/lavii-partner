import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens";
import LoginScreen from "@/screens/Auth/Login";
import RegisterScreen from "@/screens/Auth/Register";
import ResetPasswordScreen from "@/screens/Auth/ResetPassword";
import { wrapHeaderOptionsProps } from "@/navigations/utils";
const Stack = createNativeStackNavigator();

export default function NoAuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={wrapHeaderOptionsProps("Tenho conta")}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={wrapHeaderOptionsProps("Criar conta")}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={wrapHeaderOptionsProps("Redefinir Senha")}
      />

    </Stack.Navigator>


  );
}
