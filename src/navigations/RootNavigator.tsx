import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import { wrapHeaderOptionsProps } from "@/navigations/utils";
import HelpScreen from "@/screens/Settings/Help";
import PersonalDataScreen from "@/screens/Settings/PersonalData";
import ChangePasswordScreen from "@/screens/Settings/ChangePassword";
import { RootNavigationParamList } from "./types";

const Stack = createNativeStackNavigator<RootNavigationParamList>();


export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Group>
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={wrapHeaderOptionsProps("Ajuda")}
        />
        
        <Stack.Screen
          name="PersonalData"
          component={PersonalDataScreen}
          options={wrapHeaderOptionsProps("Dados Pessoais")}
        />
        
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={wrapHeaderOptionsProps("Alterar Senha")}
        />
      </Stack.Group>
    </Stack.Navigator>


  );
}
