import { scaleSize } from "@/utils/responsive";
import styled from "@/utils/styled";
import { View, TextInput, TextInputProps, ViewProps } from "react-native";

export const ContainerInput = styled(View, {
  width: "100%",
  position: "relative",
  justifyContent: "center",
});

export const StyledTextInput = styled<{ leftIconSize: number }, TextInputProps>(
  TextInput,
  ({ leftIconSize }) => ({
    height: scaleSize(48),
    borderColor: "black",
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(10),
    paddingLeft: scaleSize(16 + leftIconSize),
    paddingRight: scaleSize(40),
    fontFamily: "Poppins_400Regular",
    fontSize: scaleSize(14),
    width: "100%",
  })
);

export const IconWrapper = styled<{ position: "left" | "right" }, ViewProps>(
  View,
  ({ position }) => ({
    position: "absolute",
    ...(position === "left" && { left: 12 }),
    ...(position === "right" && { right: 12 }),
  })
);
