import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const BackIconButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black"/>
        </TouchableOpacity>
    );
};


export default BackIconButton;