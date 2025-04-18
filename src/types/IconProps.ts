import { Icon } from "@expo/vector-icons/build/createIconSet";

export interface IconProps {
  family: Icon<any, any>;
  name: string;
  size?: number;
  color?: string;
}
