import React, { useState, useRef, useEffect, useMemo } from "react";
import { ActivityIndicator, Pressable, PressableProps, View, Animated, Alert, FlatList, TouchableOpacity, TouchableOpacityProps, FlatListProps } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@/contexts/Auth";
import {
  alternativeColor,
  primaryColor,
  Center,
  Container,
  SubtitleText,
  Image,
  mutedAccentColor,
  TitleText,
  mutedColor,
  Row,
  Switch,
  Column,
  scaleSize,
  TitleLargeText,
  RegularText,
  numberToCurrency,
  styled,
  neutralLightColor,
  SmallText,
  neutralColor,
  SmallCaptionText,
  Space,
  Card,
  CaptionText,
  Gutter,
  ScheduleCard,
} from "@lavii/ds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { scheduleCardStatusProps } from "@/constants/order.consts";
import { RootNavigationParamList } from "@/navigations/types";
import { OrderStatus } from "@/types/order";


interface OrderRequests {
  service: { name: string };
  address: {
    text: string;
    latitude: number;
    longitude: number;
  };
  category: {
    name: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  };
  customer: {
    name: string;
  };
  price: number;
  realizationAt: Date;
  expiresAt: Date;
}


const orderRequests: OrderRequests[] = [
  {
    service: { name: "Limpeza completa" },
    address: { text: "Av Siclano Figueredo, 634", latitude: 1, longitude: 1 },
    category: { name: "Moto", icon: "motorcycle" },
    customer: { name: "Pedro" },
    realizationAt: new Date(),
    expiresAt: new Date(new Date().getTime() + 6000 * 3), // 3 minutos
    price: 100,
  },
  {
    service: { name: "Serviço 2" },
    address: { text: "Endereço 2", latitude: 2, longitude: 2 },
    category: { name: "Carro", icon: "directions-car" },
    customer: { name: "João" },
    realizationAt: new Date(new Date().getTime() + 6000 * 10), // 10 minutos
    expiresAt: new Date(),
    price: 200,
  },
];


export function HomeHeader({ name }: { name: string }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    if (enabled) {
      Alert.alert(
        "Ficar offline",
        "Significa que hoje você não quer receber mais pedidos.",
        [
          {
            text: "Manter off",
            onPress: () => setEnabled(false),
            style: "cancel"
          },
          {
            text: "Ficar on",
            isPreferred: true,
          },
        ]
      );
    } else {
      setEnabled(true);
    }
  };

  return (
    <Row mainAlign="space-between" crossAlign="center">
      <SubtitleText.Bold color={mutedAccentColor}>Olá, {name} </SubtitleText.Bold>
      <Switch label={enabled ? "Online" : "Offline"} enabled={enabled} onToggle={handleToggle} />
    </Row>

  )
}

export function HomeEmptyState() {
  return (
    <Center>
      <TitleText color={mutedColor}>Você não tem pedidos</TitleText>
      <Image
        height={200}
        source={require("@/assets/images/illustrations/car-location.svg")}
        contentFit="contain"
      />
    </Center>
  )
}

const SmallButton = styled(TouchableOpacity, {
  height: 24,
  // maxWidth: scaleSize(134),
  backgroundColor: neutralLightColor,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 1,
  paddingHorizontal: scaleSize(8),
});

const ButtonIcon = styled<{ backgroundColor: string }, TouchableOpacityProps>(TouchableOpacity, (props) => ({
  width: 49,
  height: 49,
  backgroundColor: props.backgroundColor,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
}));

const CardContent = styled(View, {
  width: scaleSize(256),
  gap: scaleSize(8),
});

const FlatListWithoutMargins = styled<FlatListProps<OrderRequests>, FlatListProps<OrderRequests>>(FlatList, {
  marginHorizontal: -24,
  paddingHorizontal: 24,
});

export function OrderRequestItem({ request }: { request: OrderRequests }) {

  const realizationAt = useMemo(() => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(request.realizationAt);
  }, [request.realizationAt]).split(",").join(" às ");


  return (
    <Card backgroundColor={primaryColor} borderRadius={30} padding={scaleSize(16)}>
      <CardContent>
        <TitleLargeText.Bold numberOfLines={1} adjustsFontSizeToFit color={alternativeColor}>{request.service.name}</TitleLargeText.Bold>
        <SmallButton>
          <SmallText.Medium numberOfLines={1} ellipsizeMode="middle" color={alternativeColor}>{request.address.text}</SmallText.Medium>
        </SmallButton>

        <Row crossAlign="center">
          <RegularText.SemiBold numberOfLines={1} adjustsFontSizeToFit color={alternativeColor}> {numberToCurrency(request.price)}  </RegularText.SemiBold>
          <RegularText.SemiBold numberOfLines={1} adjustsFontSizeToFit color={mutedColor}>{realizationAt}</RegularText.SemiBold>
        </Row>


        <Row crossAlign="center" crossGap={8}>
          <MaterialIcons name={request.category.icon} size={24} color={alternativeColor} />
          <RegularText.SemiBold numberOfLines={1} adjustsFontSizeToFit color={alternativeColor}>{request.category.name} de {request.customer.name}</RegularText.SemiBold>
        </Row>

        <Row style={{ flexShrink: 1 }} crossAlign="flex-end" mainAlign="space-around">
          <CaptionText numberOfLines={1} adjustsFontSizeToFit color={neutralColor}>Expira em 10m 43s</CaptionText>

          <ButtonIcon backgroundColor={neutralLightColor}>
            <Ionicons size={24} color="white" name="close-sharp" />
          </ButtonIcon>

          <ButtonIcon backgroundColor={mutedColor}>
            <Ionicons size={24} color="white" name="checkmark-done-sharp" />
          </ButtonIcon>
        </Row>
      </CardContent>


    </Card>
  )
}

export function OrderRequestList() {
  return (
    <Gutter space={scaleSize(16)}>
      <TitleText color={primaryColor}>Solicitações</TitleText>

      <FlatListWithoutMargins
        data={orderRequests}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: OrderRequests }) => <OrderRequestItem request={item} />}
        ItemSeparatorComponent={() => <Space size={scaleSize(16)} />}
      />
    </Gutter>
  )
}

export function HomeContent({ loading }: { loading: boolean }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();

  const handleSeeAll = () => {
    navigation.navigate("Tabs", {
      screen: "Activities",
    });
  }

  if (loading) return (
    <Center>
      <ActivityIndicator size="large" color={primaryColor} />
    </Center>
  )

  if (orderRequests.length === 0) return (
    <HomeEmptyState />
  )

  return (
    <Gutter space={scaleSize(36)}>
      <OrderRequestList />
      <Gutter space={scaleSize(16)}>
        <Row crossAlign="center" mainAlign="space-between">
          <TitleText color={primaryColor}>Proximos trabalhos</TitleText>
          <TouchableOpacity onPress={handleSeeAll}>
            <Row crossAlign="center">
              <RegularText.Medium color={mutedColor}>
                Ver todos
              </RegularText.Medium>
              <MaterialIcons name="chevron-right" size={24} color={mutedColor} />
            </Row>
          </TouchableOpacity>
        </Row>
        <ScheduleCard
          time="10:00"
          serviceName="Limpeza completa"
          address="Av Siclano Figueredo, 634"
          status={OrderStatus.STARTED}
          alternativeAction={{
            icon: <MaterialIcons name="settings" size={24} color="white" />,
            onPress: () => { },
          }}
          price={100}
          categoryIcon="motorcycle"
          type="IN_PERSON"
          personName="Pedro"
          onCancel={() => { }}
          onNext={() => { }}
          configs={scheduleCardStatusProps}
        />
      </Gutter>
    </Gutter>
  )
}

export default function HomeScreen() {
  const { data, loading } = useAuth();

  return (
    <Container backgroundColor={alternativeColor} withVerticalPadding edges={{ top: "maximum", bottom: "maximum" }}>
      <HomeHeader name={data?.partner?.name || ""} />
      <HomeContent loading={loading} />
    </Container>
  );
}
