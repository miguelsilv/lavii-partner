import { IconProps } from "@/types";
import { TextInputProps } from "react-native";

export interface IconButtonProps extends IconProps {
  onPress?: () => void;
}

export interface InputProps extends TextInputProps {
  placeholder?: string;
  leftIcon?: IconButtonProps;
  rightIcon?: IconButtonProps;
}
