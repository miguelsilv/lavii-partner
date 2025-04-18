import {Text} from "react-native";
import {scaleSize} from "@/utils/responsive";

const HeaderLeftTitle = ({title}: { title: string }) => {
    return (
        <Text style={{
            flex: 1,
            textAlign: "left",
            fontFamily: "Poppins_500Medium",
            fontSize: scaleSize(24),
            marginLeft: 24
        }}>
            {title}
        </Text>

    )
}

export default HeaderLeftTitle;