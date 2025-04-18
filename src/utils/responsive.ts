import { Dimensions, PixelRatio } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

// Largura de referência (ex: iPhone 6 / 7 / 8)
const REFERENCE_WIDTH = 375;

const getWidthPixelByPercentage = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((deviceWidth * percentage) / 100);
};

const getHeightPixelByPercentage = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((deviceHeight * percentage) / 100);
};

const scaleSize = (size: number) => {
  const scalingFactor = size / REFERENCE_WIDTH;
  return Math.round(scalingFactor * deviceWidth);
};

export { getWidthPixelByPercentage, getHeightPixelByPercentage, scaleSize };
