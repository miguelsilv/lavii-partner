import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootNavigationParamList = {
  Tabs:  {
    screen: "Home" | "Activities" | "Notifications" | "Settings";
  };
  Activities: undefined;
  ProofOfPayment: {
    orderId: string;
  };
  Help: undefined;
  PersonalData: undefined;
  ChangePassword: undefined;
};

export type RootNavigationProp<T extends keyof RootNavigationParamList> =
  NativeStackNavigationProp<RootNavigationParamList, T>;

export type RootRouteProp<T extends keyof RootNavigationParamList> = RouteProp<
  RootNavigationParamList,
  T
>;