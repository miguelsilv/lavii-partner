import { alternativeColor, neutralColor } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { styled } from "@lavii/ds";
import { View, ScrollView, ViewProps, ScrollViewProps } from "react-native";

const spacingSize = 24;
const headingTextSize = 24;

interface TabsViewProps {
  topSafeArea: number;
}

export const TabsView = styled<TabsViewProps, ViewProps>(View, (props) => ({
  height: scaleSize(38),
  position: "absolute",
  top: scaleSize(props.topSafeArea + headingTextSize + spacingSize),
  left: 0,
  right: 0,
  backgroundColor: alternativeColor,
  zIndex: 1
}));

export const Divider = styled(View, {
  width: "100%",
  backgroundColor: neutralColor,
  height: 1,
  marginLeft: scaleSize(spacingSize),
});
