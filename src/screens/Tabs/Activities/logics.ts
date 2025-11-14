import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useApiResource } from "@/hooks/useApiResource";
import { useCallback, useMemo, useState } from "react";
import { IOrderAddressResponse, IOrderResponse } from "@/api/requests/OrderApi";
import { OrderStatus } from "@/types/order";
import { Linking, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { RootNavigationParamList } from "@/navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { queryClient } from "@/config/queryClient";

export type TabType = "all" | "completed" | "inProgress";

const TAB_STATUS_MAP: Record<TabType, string | undefined> = {
  all: undefined,
  completed: "DONE",
  inProgress: [OrderStatus.PAID, OrderStatus.STARTED].join(","),
};

export function useOrdersTabs() {
  const [currentTab, setCurrentTab] = useState<TabType>("all");

  const handleTabChange = useCallback((index: number) => {
    const tabs: TabType[] = ["all", "completed", "inProgress"];
    setCurrentTab(tabs[index]);
  }, []);

  return { currentTab, handleTabChange };
}

export function useOrdersPagination(currentTab: TabType) {
  const { orderApi } = useApiResource();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['orders', currentTab],
    queryFn: async ({ pageParam }) => {
      const response = await orderApi.getMyOrders({
        page: pageParam,
        daysPerPage: 3,
        status: TAB_STATUS_MAP[currentTab],
      });
      if (response.error) throw response.error;
      return response.data!;
    },
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const sections = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap(page => page.data)
      .map(item => ({
        title: item.date,
        data: item.orders,
      }));
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, fetchNextPage]);

  return {
    sections,
    loading: isLoading,
    error,
    hasMore: hasNextPage ?? false,
    handleLoadMore,
    refetch,
  };
}

export function useOrderNavigation() {
  const openNavigation = useCallback(async (address: IOrderAddressResponse) => {
    const { latitude, longitude, text } = address;
    const encodedAddress = encodeURIComponent(text);

    try {
      if (Platform.OS === "ios") {
        const urlApple = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
        const urlWaze = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes${encodedAddress ? `&q=${encodedAddress}` : ""}`;

        const canOpenWaze = await Linking.canOpenURL("waze://");
        if (canOpenWaze) {
          return Linking.openURL(urlWaze);
        }

        return Linking.openURL(urlApple);
      } else {
        const geoUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
        return Linking.openURL(geoUrl);
      }
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de navegação");
    }
  }, []);

  return { openNavigation };
}

export function useOrderActions(onOrderUpdated: () => void) {
  const { orderApi } = useApiResource();
  const navigation = useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
  const dispatch = useDispatch();

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId: string) => orderApi.reject(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      Alert.alert("Sucesso", "Pedido cancelado com sucesso");
      onOrderUpdated();
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "Não foi possível cancelar o pedido";
      Alert.alert("Erro", errorMessage);
    },
  });

  const handleCancelOrder = useCallback(async (orderId: string) => {
    Alert.alert(
      "Cancelar pedido",
      "Tem certeza que deseja cancelar este pedido?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => cancelOrderMutation.mutate(orderId),
        },
      ]
    );
  }, [cancelOrderMutation]);


  return { handleCancelOrder };
}

