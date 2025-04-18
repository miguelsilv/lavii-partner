import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
