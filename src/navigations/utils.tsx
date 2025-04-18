import HeaderLeftTitle from "@/navigations/components/LeftHeaderTitle";
import BackIconButton from "@/navigations/components/BackIconButton";

export const wrapHeaderOptionsProps = (title: string) => ({
    headerTitle: () => <HeaderLeftTitle title={title}/>,
    headerLeft: () => <BackIconButton/>,
    headerTitleAlign: "left",
    headerShadowVisible: false
} as any)