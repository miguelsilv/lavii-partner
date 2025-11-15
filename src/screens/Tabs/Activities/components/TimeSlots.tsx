import { FlatList, Pressable, ActivityIndicator, View } from "react-native";
import { ContentTimeSlot } from "../style";
import { alternativeColor, blackColor, neutralColor, primaryColor } from "@lavii/ds";
import { SubtitleText } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { Expanded } from "@lavii/ds";
import { TimeSlotsProps } from "../types";

export default function TimeSlots({ timeSlots, selectedTime, onSelectTime, loading }: TimeSlotsProps) {
  if (loading) {
    return (
      <Expanded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={primaryColor} />
          <SubtitleText style={{ marginTop: scaleSize(16) }}>
            Carregando horários disponíveis...
          </SubtitleText>
        </View>
      </Expanded>
    );
  }

  return (
    <Expanded>
      <FlatList
        data={timeSlots}
        numColumns={4}
        columnWrapperStyle={{ gap: scaleSize(8) }}
        contentContainerStyle={{ gap: scaleSize(8) }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => onSelectTime(item.time)}>
            <ContentTimeSlot 
              style={{
                backgroundColor: selectedTime === item.time ? primaryColor : neutralColor,
              }}
            >
              <SubtitleText.Medium
                color={selectedTime === item.time ? alternativeColor : blackColor}
              >
                {item.time}
              </SubtitleText.Medium>
            </ContentTimeSlot>
          </Pressable>
        )}
      />
    </Expanded>
  );
}

