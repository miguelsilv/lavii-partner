import HeaderLeftTitle from "@/navigations/components/LeftHeaderTitle";
import BackIconButton from "@/navigations/components/BackIconButton";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { backgroundLightColor } from "@lavii/ds";
import { Platform } from "react-native";
import { TitleLargeText } from "@lavii/ds";
import { Margin } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";

interface WrapHeaderOptionsProps {
    title: string;
    color?: string;
    backgroundColor?: string;
    titleAlign?: "left" | "center";
}

export function wrapHeaderOptionsProps(
    title: string,
    configs?: Partial<WrapHeaderOptionsProps>): NativeStackNavigationOptions {
    const { color = "black", backgroundColor = backgroundLightColor, titleAlign = "left" } = configs ?? {};

    if (Platform.OS === "ios") {
        return {
            headerTitleAlign: titleAlign ?? "left",
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            headerTitle: () => <TitleLargeText>{title}</TitleLargeText>,
        }
    }

    return {
        headerTitle: () => <HeaderLeftTitle title={title} color={color} titleAlign={titleAlign} />,
        headerLeft: Platform.OS === "android" ? () => <BackIconButton /> : undefined,
        // headerTitleAlign: titleAlign ?? "left",
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: backgroundColor,
        },
    }
}