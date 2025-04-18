import { ImageContentFit, ImageSource } from "expo-image";
import { DimensionValue } from "react-native";

export interface ImageProps {
  width?: DimensionValue;
  height?: DimensionValue;
  contentFit?: ImageContentFit;
  source: ImageSource | string;
  fill?: "horizontal" | "vertical" | "all";
}
