import { Animated } from "react-native";
import { RefAttributes } from "react";
import { View, ViewProps, Text, TextProps } from "react-native";
import { primaryColor } from "@/styles/colors";
import styled from "@/utils/styled";

interface ContainerButtonProps {
  pressed: boolean;
  outline?: boolean;
}

interface RippleEffectProps {
  x: number;
  y: number;
  rippleSize: number;
}

export const ContainerButton = styled<ContainerButtonProps, ViewProps>(
  View,
  (props) => ({
    ...(!props.outline && { backgroundColor: primaryColor }),
    ...(props.outline && { borderColor: primaryColor }),
    ...(props.outline && { borderWidth: 2 }),
    width: "100%",
    borderRadius: 10,
    height: 49,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  })
);

export const RippleEffect = styled<
  RippleEffectProps,
  Animated.AnimatedProps<ViewProps>
>(Animated.View, (props) => ({
  position: "absolute",
  top: props.y - props.rippleSize / 2,
  left: props.x - props.rippleSize / 2,
  width: props.rippleSize,
  height: props.rippleSize,
  borderRadius: props.rippleSize / 2,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
}));
