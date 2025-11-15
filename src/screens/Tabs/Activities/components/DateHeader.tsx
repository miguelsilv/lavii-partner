import { Row, Space } from "@lavii/ds";
import { TitleLargeText } from "@lavii/ds";
import { blackColor } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DateHeaderProps } from "../types";
import { Pressable } from "react-native";

export default function DateHeader({
  date,
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
}: DateHeaderProps) {
  return (
    <Row mainAlign="space-between" crossAlign="center" fill>
      <Row crossAlign="center">
        <Space onlyHorizontal size={10} />
        <TitleLargeText color={blackColor}>{date}</TitleLargeText>
      </Row>
      <Row crossAlign="center">
        <Pressable
          onPress={canGoPrevious ? onPrevious : undefined}
          disabled={!canGoPrevious}
          style={{ opacity: canGoPrevious ? 1 : 0.3 }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={scaleSize(42)}
            color={blackColor}
          />
        </Pressable>
        <Pressable
          onPress={canGoNext ? onNext : undefined}
          disabled={!canGoNext}
          style={{ opacity: canGoNext ? 1 : 0.3 }}
        >
          <MaterialIcons
            name="keyboard-arrow-right"
            size={scaleSize(42)}
            color={blackColor}
          />
        </Pressable>
      </Row>
    </Row>
  );
}
