import { Column, Container, Gutter, Row, Space } from "@lavii/ds";
import {
  RadioSquareButton,
  SquareButtonProps,
} from "@lavii/ds";
import { MaterialIcons } from "@expo/vector-icons";
import { blackColor, mutedColor, primaryColor, primaryLightColor } from "@lavii/ds";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import SliderComponent from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import Entypo from '@expo/vector-icons/Entypo';
import { SmallText, SubtitleText } from "@lavii/ds";
import { currentAddressSelector } from "@/store/slicers/currentAddressSlice";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { OrderType } from "@/types/order";
import { setOrderField } from "@/store/slicers/orderSlice";
import { AppDispatch } from "@/store";


const iconData = {
  family: MaterialIcons,
  size: 36,
  color: primaryColor,
};

interface ServiceTypeScreenProps {
  onChangeType?: (type: OrderType) => void;
  onGoAddresses?: () => void;
}

export default function ServiceTypeContent({ onChangeType, onGoAddresses }: ServiceTypeScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const currentAddress = useSelector(currentAddressSelector);
  const dispatch = useDispatch<AppDispatch>();

  const [type, setType] = useState<OrderType | "">("");
  const [distance, setDistance] = useState(5);
  const [deliveryDisplay, setDeliveryDisplay] = useState("Vem aqui");

  const buttons: SquareButtonProps[] = [
    {
      label: deliveryDisplay,
      value: "DELIVERY",
      icon: {
        name: "directions-run",
        ...iconData,
      },
    },
    {
      label: "Vou lá",
      value: "IN_PERSON",
      icon: {
        name: "store",
        ...iconData,
      },
    },
  ];

  return (
    <Column mainGap={16}>
      <Gutter space={8}>
        <SmallText.Medium color={mutedColor}>Endereço</SmallText.Medium>
        <TouchableOpacity onPress={onGoAddresses}>
          <Row >
            <MaterialIcons name="location-on" size={scaleSize(24)} color={primaryLightColor} />
            <SmallText style={{ flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail" >{currentAddress?.text}</SmallText>
            <Entypo name="chevron-small-down" size={scaleSize(24)} color={mutedColor} />
          </Row>
        </TouchableOpacity>
      </Gutter>
      <SubtitleText.Medium color={blackColor}>Onde será o serviço?</SubtitleText.Medium>
      <RadioSquareButton
        buttons={buttons}
        onChangeValue={(value) => {
          const orderType = value as OrderType;
          setType(orderType);
          dispatch(setOrderField({ field: "type", value: orderType }));
          onChangeType?.(orderType);
          if (value === "DELIVERY") {
            setDeliveryDisplay("Vem aqui");
          } else {
            setDeliveryDisplay("Aqui");
          }
        }}
      />
      {type === "IN_PERSON" && (
        <Gutter space={8}>
          <Row mainAlign="space-between">
            <SmallText.Medium>Distância máxima</SmallText.Medium>
            <SmallText.Medium>{distance.toFixed(0)} Km</SmallText.Medium>
          </Row>
          <SliderComponent min={5} max={20} onValueChange={setDistance} />
        </Gutter>
      )}
    </Column>
  );
}
