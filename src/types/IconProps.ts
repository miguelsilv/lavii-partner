import { Icon } from "@expo/vector-icons/build/createIconSet";


export interface IconProps<GLYPHS extends string, T extends string> {
  family: Icon<GLYPHS, T>;
  name: keyof GLYPHS;
  size?: number;
  color?: string;
}

export interface IconButtonProps<GLYPHS extends string, T extends string> extends IconProps<GLYPHS, T> {
  onPress?: () => void;
  backgroundColor?: string;
}