import { FlatList, Pressable, View } from "react-native";
import { ContentDateSelected } from "../style";
import { primaryColor } from "@lavii/ds";
import { TitleLargeText, SubtitleText } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { DaysOfWeekProps } from "../types";

export default function DaysOfWeek({ days, selectedDay, onSelectDay, scrollRef }: DaysOfWeekProps) {
  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <View style={{ paddingVertical: scaleSize(10), marginHorizontal: scaleSize(-24) }}>
      <FlatList
        ref={scrollRef}
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: scaleSize(24) }}
        renderItem={({ item }) => {
          const isSelected = isSameDay(selectedDay, item.date);
          const isDisabled = item.disabled;
          
          return (
            <Pressable 
              onPress={() => !isDisabled && onSelectDay(item.date)}
              disabled={isDisabled}
              style={{ opacity: isDisabled ? 0.3 : 1 }}
            >
              <ContentDateSelected 
                style={{
                  backgroundColor: isSelected ? primaryColor : '#D9D9D9',
                }}
              >
                <TitleLargeText.SemiBold 
                  color={isSelected ? "#FFF" : "#2D2D2D"}
                >
                  {item.date.getDate()}
                </TitleLargeText.SemiBold>
                <SubtitleText 
                  color={isSelected ? "#FFF" : "#2D2D2D"}
                >
                  {item.day}
                </SubtitleText>
              </ContentDateSelected>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

