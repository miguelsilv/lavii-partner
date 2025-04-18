import {
  blackColor,
  mutedColor,
  primaryColor,
  secondaryColor,
} from "@/styles/colors";
import styled from "@/utils/styled";

import { Text, TextProps } from "react-native";

type FontWeight = 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface BaseTextProps {
  color?: string;
  /**
   * exclusivo do Hint Text
   */
  size?: number;
  /**
   * exclusivo do Hint Text
   */
  weight?: FontWeight;
}

const weightMap: { [x: string]: FontWeight } = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900,
};

const hintTextStyled = ({ color, size, weight }: BaseTextProps) => ({
  color: color ?? blackColor,
  fontSize: size,
  fontWeight: weight,
});

const hintTextColor = (color: string) =>
  styled<BaseTextProps, TextProps>(Text, ({ size, weight }) =>
    hintTextStyled({ color, size, weight })
  );

export const HintText = styled<BaseTextProps, TextProps>(
  Text,
  hintTextStyled
).withSubComponents({
  Primary: hintTextColor(primaryColor),
  Secondary: hintTextColor(secondaryColor),
  Muted: hintTextColor(mutedColor),
});

// Textos pequenos

export const CaptionText = styled(HintText, {
  fontSize: 10,
  fontWeight: weightMap.semiBold,
});

const SmallLightText = styled(HintText, {
  fontSize: 12,
  fontWeight: weightMap.light,
});

const SmallMediumText = styled(HintText, {
  fontSize: 12,
  fontWeight: weightMap.medium,
});

const SmallSemiBoldText = styled(HintText, {
  fontSize: 12,
  fontWeight: weightMap.semiBold,
});

export const SmallText = styled(HintText, {
  fontSize: 12,
}).withSubComponents({
  Light: SmallLightText,
  Medium: SmallMediumText,
  SemiBold: SmallSemiBoldText,
});

// Textos base (corpo)

const RegularSemiBoldText = styled(HintText, {
  fontSize: 14,
  fontWeight: weightMap.semiBold,
});

export const RegularText = styled(HintText, {
  fontSize: 14,
}).withSubComponents({
  SemiBold: RegularSemiBoldText,
});

// Subtitles

const SubtitleLightText = styled(HintText, {
  fontSize: 16,
  fontWeight: weightMap.light,
});

const SubtitleBoldText = styled(HintText, {
  fontSize: 16,
  fontWeight: weightMap.semiBold,
});

const SubtitleHeavyText = styled(HintText, {
  fontSize: 16,
  fontWeight: weightMap.heavy,
});

export const SubtitleText = styled(HintText, {
  fontSize: 16,
}).withSubComponents({
  Light: SubtitleLightText,
  Bold: SubtitleBoldText,
  Heavy: SubtitleHeavyText,
});

export const TitleSmallText = styled(HintText, {
  fontSize: 18,
  fontWeight: weightMap.semiBold,
});

export const TitleText = styled(HintText, {
  fontSize: 20,
  fontWeight: weightMap.semiBold,
});

const TitleLargeBoldText = styled(HintText, {
  fontSize: 24,
  fontWeight: weightMap.bold,
});

export const TitleLargeText = styled(HintText, {
  fontSize: 24,
  fontWeight: weightMap.semiBold,
}).withSubComponents({
  Bold: TitleLargeBoldText,
});

export const DisplayText = styled(HintText, {
  fontSize: 32,
  fontWeight: weightMap.bold,
});
