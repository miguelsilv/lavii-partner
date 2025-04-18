import styled from "@/utils/styled";
import { PropsWithChildren } from "react";
import { FlexAlignType, ScrollViewProps, View, ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export const Container = styled<
  { backgroundColor?: string },
  SafeAreaViewProps
>(SafeAreaView, ({ backgroundColor }) => ({
  flex: 1,
  padding: 24,
  backgroundColor: backgroundColor ?? "#F1F1F1",
}));

export const ContainerScrollable = (
  props: PropsWithChildren<SafeAreaViewProps & { scroll?: ScrollViewProps }>
) => {
  const { scroll, ...rest } = props;
  return (
    <Container style={{ padding: 0 }} {...(rest as any)}>
      <ScrollView style={{ padding: 24 }} showsVerticalScrollIndicator={false} {...scroll}>
        {props.children}
      </ScrollView>
    </Container>
  );
};

export const Section = styled(View, {
  marginBottom: 24,
  width: "100%",
});

export const InnerSection = styled(View, {
  marginBottom: 16,
  width: "100%",
});

export const Margin = styled<
  {
    horizontal?: boolean;
    vertical?: boolean;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  },
  ViewProps
>(View, (props) => {
  const margin = 8;
  const isDefaultHorizontal =
    !props.top &&
    !props.bottom &&
    !props.left &&
    !props.right &&
    !props.horizontal &&
    !props.vertical;

  return {
    marginTop: props.top || props.vertical ? margin : null,
    marginBottom: props.bottom || props.vertical ? margin : null,
    marginLeft:
      props.left || props.horizontal || isDefaultHorizontal ? margin : null,
    marginRight:
      props.right || props.horizontal || isDefaultHorizontal ? margin : null,
  };
});

export const Gutter = styled<
  {
    space?: number;
    horizontalSpace?: number;
    verticalSpace?: number;
    horizontal?: boolean;
  },
  ViewProps
>(View, (props) => {
  return {
    flexDirection: !props.horizontal ? "column" : "row",
    gap: props.space ?? 0,
    rowGap: props.verticalSpace ?? props.space ?? 0,
    columnGap: props.horizontalSpace ?? props.space ?? 0,
  };
});

type CrossAlign = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type MainAlign =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export const Row = styled<
  { mainAlign?: MainAlign; crossAlign?: CrossAlign },
  ViewProps
>(View, (props) => ({
  flexDirection: "row",
  justifyContent: props.mainAlign,
  alignItems: props.crossAlign ?? "center",
}));

export const Column = styled<
  { mainAlign?: MainAlign; crossAlign?: CrossAlign },
  ViewProps
>(View, (props) => ({
  flexDirection: "column",
  justifyContent: props.mainAlign,
  alignItems: props.crossAlign,
  width:"100%"
}));

export const Center = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  verticalAlign: "middle",
  flexGrow:1,
});

type Alignment =
  | "bottomCenter"
  | "bottomLeft"
  | "bottomRight"
  | "topCenter"
  | "topLeft"
  | "topRight"
  | "center";

export const Align = styled<{ alignment?: Alignment }, ViewProps>(
  View,
  (props) => {
    const alignment = props.alignment ?? "center";

    const alignItems = alignment.includes("Left")
      ? "flex-start"
      : alignment.includes("Right")
      ? "flex-end"
      : "center";

    const justifyContent = alignment.includes("top")
      ? "flex-start"
      : alignment.includes("bottom")
      ? "flex-end"
      : "center";

    return {
      flex: 1,
      justifyContent,
      alignItems,
    };
  }
);

export const Space = styled<
  { size?: number; onlyHorizontal?: boolean; onlyVertical?: boolean },
  ViewProps
>(View, (props) => ({
  ...(!props.onlyVertical && { width: props.size ?? 8 }),
  ...(!props.onlyHorizontal && { height: props.size ?? 8 }),
}));

export const Expanded = styled(View, {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  width: "100%"
});
