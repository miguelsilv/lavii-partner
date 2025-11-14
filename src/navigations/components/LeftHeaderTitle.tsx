import { Text } from "react-native";
import { scaleSize } from "@lavii/ds";
import { Row } from "@lavii/ds";
import BackIconButton from "./BackIconButton";

interface HeaderLeftTitleProps {
    title: string;
    color?: string;
    titleAlign?: "left" | "center";
}

const HeaderLeftTitle = ({ title, color, titleAlign }: HeaderLeftTitleProps) => {
    return (
        <Text style={{
            flex: 1,
            textAlign: titleAlign ?? "left",
            fontWeight: 500,
            // fontFamily: "Poppins_500Medium",
            fontSize: scaleSize(24),
            ...(titleAlign === "left" && { marginLeft: scaleSize(24) }),
            color: color,
        }}>
            {title}
        </Text>
    )
}

export default HeaderLeftTitle;