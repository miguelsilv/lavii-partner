import { scaleSize } from "@lavii/ds";
import { View, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@lavii/ds";
import { Column, Container, Expanded, Gutter, Row, Space } from "@lavii/ds";
import { Image } from "@lavii/ds";
import { alternativeColor, neutralColor, secondaryColor } from "@lavii/ds";
import { RegularText, SubtitleText } from "@lavii/ds";
import { RootNavigationProp, RootRouteProp } from "@/navigations/types";
import { useApiResource } from "@/hooks/useApiResource";
import { numberToCurrency } from "@/utils/masks";
import { useQuery } from "@tanstack/react-query";

function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);
    
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${day} de ${month} de ${year} às ${hours}:${minutes}h`;
}

function Item({ title, value }: { title: string, value: string }) {
    return (
        <Column crossAlign="flex-start" mainGap={4}>
            <RegularText.Bold color={secondaryColor}>{title}</RegularText.Bold>
            <RegularText>{value}</RegularText>
        </Column>
    )
}

function DividingLine() {
    return (
        <View style={{ width: "100%", marginVertical: 16, height: 1, backgroundColor: neutralColor }} />
    )
}

export default function ProofOfPaymentScreen() {
    const navigation = useNavigation<RootNavigationProp<"ProofOfPayment">>();
    const route = useRoute<RootRouteProp<"ProofOfPayment">>();
    const { orderId } = route.params;
    const { orderApi } = useApiResource();
    
    const { data: orderSummary, isLoading } = useQuery({
        queryKey: ['order', 'summary', orderId],
        queryFn: async () => {
            const response = await orderApi.summary(orderId);
            if (response.error) throw response.error;
            return response.data;
        },
    });

    if (isLoading || !orderSummary) {
        return (
            <Container backgroundColor={alternativeColor}>
                <Expanded>
                    <ActivityIndicator size="large" color={secondaryColor} />
                </Expanded>
            </Container>
        );
    }

    return (
        <Container backgroundColor={alternativeColor}>
            <Image
                height={scaleSize(200)}
                contentFit="contain"
                source={require("@/assets/images/illustrations/invoices.svg")}
            />
            <Space size={32} />
            <Expanded>
                <Gutter space={8}>
                    <Item title="Serviço" value={orderSummary.service.name} />
                    <Item title="Data e Hora" value={formatDateTime(orderSummary.realizationAt)} />
                    <Item title="Endereço" value={orderSummary.address.text} />
                    <Item title="Método de pagamento" value={orderSummary.payment.method} />
                </Gutter>
                <DividingLine />
                <Row mainAlign="space-between" mainGap={4}>
                    <SubtitleText.Bold color={secondaryColor}>Valor do serviço</SubtitleText.Bold>
                    <SubtitleText.Bold color={secondaryColor}>{numberToCurrency(orderSummary.price)}</SubtitleText.Bold>
                </Row>
            </Expanded>
            <Button title="Concluir" onPress={() => navigation.goBack()} />
        </Container>
    )
}