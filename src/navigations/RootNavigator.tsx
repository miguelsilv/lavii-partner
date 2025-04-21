import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import { wrapHeaderOptionsProps } from "./utils";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
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
    </Stack.Navigator>
  );
}
