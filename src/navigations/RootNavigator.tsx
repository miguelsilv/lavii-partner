import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
