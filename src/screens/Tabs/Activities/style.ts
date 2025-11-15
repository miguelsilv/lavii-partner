import { neutralColor, scaleSize } from "@lavii/ds";
import { styled } from "@lavii/ds";
import { View } from "react-native";

export const ContentTimeSlot = styled(View, {
  height: scaleSize(48),
  width: scaleSize(74),
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
});

export const ContentDateSelected = styled(View, {
  height: 104,
  width: 100,
  borderRadius: 8,
  marginHorizontal: 5,
  alignItems: "center",
  justifyContent: "center",
});

export const Divider = styled(View, {
  width: "100%",
  backgroundColor: neutralColor,
  height: 1,
  marginLeft: scaleSize(24),
});
