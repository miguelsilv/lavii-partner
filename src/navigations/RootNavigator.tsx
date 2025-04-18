import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens";
import { Entypo } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      /> */}

      {/* 
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={wrapHeaderOptionsProps("Tenho conta")}
      /> */}
    </Stack.Navigator>
  );
}
