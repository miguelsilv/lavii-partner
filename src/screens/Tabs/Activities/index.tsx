import { TabGroup, ScheduleCard, primaryLightColor, OrderStatus, secondaryLightColor, mutedColor, ScheduleCardStatusProps, ScheduleCardAction, mutedLightColor } from "@lavii/ds";
import { Container, Space } from "@lavii/ds";
import { TitleLargeText, SubtitleText, RegularText } from "@lavii/ds";
import { alternativeColor, secondaryColor, primaryColor } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "@lavii/ds";
import { Divider, TabsView } from "./style";
import { SectionList, ActivityIndicator, View } from "react-native";
import { useOrdersTabs, useOrdersPagination, useOrderNavigation, useOrderActions } from "./logics";
import { scheduleCardStatusProps } from "@/constants/order.consts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";




export default function ActivitiesScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const { currentTab, handleTabChange } = useOrdersTabs();
  const { sections, loading, hasMore, handleLoadMore, refetch } = useOrdersPagination(currentTab);
  const { openNavigation } = useOrderNavigation();

  const { handleCancelOrder } = useOrderActions(refetch);

  const tabs = [
    { label: "Tudo" },
    { label: "Concluídos" },
    { label: "Andamento" },
  ];

  const renderFooter = () => {
    if (loading && sections.length > 0) {
      return (
        <View style={{ paddingVertical: scaleSize(20), alignItems: "center" }}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      );
    }

    if (hasMore && !loading) {
      return (
        <View style={{ paddingVertical: scaleSize(20), alignItems: "center" }}>
          <SubtitleText.Bold onPress={handleLoadMore} color={secondaryColor}>Carregar mais</SubtitleText.Bold>
        </View>
      );
    }

    return null;
  };

  const renderEmpty = () => {
    if (loading && sections.length === 0) {
      return (
        <View style={{ paddingVertical: scaleSize(40), alignItems: "center" }}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      );
    }

    return (
      <View style={{ paddingVertical: scaleSize(40), alignItems: "center" }}>
        <RegularText color={secondaryColor}>Nenhum pedido encontrado</RegularText>
      </View>
    );
  };

  return (
    <Container backgroundColor={alternativeColor} edges={{ top: "maximum", bottom: "maximum" }}>
      <TitleLargeText style={{ marginBottom: scaleSize(24) }}>
        Atividade
      </TitleLargeText>
      <TabsView topSafeArea={safeAreaInsets.top}>
        <TabGroup
          tabs={tabs}
          onTabChange={handleTabChange}
        />
      </TabsView>
      <Space size={scaleSize(48)} />
      <SectionList
        refreshing={loading}
        onRefresh={refetch}
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.time + item.service.name + index}
        SectionSeparatorComponent={() => <Space size={scaleSize(16)} />}
        renderSectionHeader={({ section: { title } }) => (
          <Row crossAlign="center" style={{ marginBottom: scaleSize(16), backgroundColor: alternativeColor }}>
            <SubtitleText.Bold color={secondaryColor}>{title}</SubtitleText.Bold>
            <Divider />
          </Row>
        )}
        renderItem={({ item }) => (
          <ScheduleCard
            time={item.time}
            serviceName={item.service.name}
            address={item.address.text}
            status={item.status}
            alternativeAction={{
              icon: <MaterialIcons name="location-on" size={24} color="white" />,
              onPress: () => openNavigation(item.address),
            }}
            price={item.price}
            categoryIcon={item.category.iconName}
            type={item.type}
            personName={item.partner.name}
            onCancel={() => handleCancelOrder(item.id)}
            onNext={() => { console.log("next") }}
            configs={scheduleCardStatusProps}
          />
        )}
        ItemSeparatorComponent={() => <Space size={16} />}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
}
