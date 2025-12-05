import {
  TabGroup,
  ScheduleCard,
  primaryLightColor,
  OrderStatus,
  secondaryLightColor,
  mutedColor,
  ScheduleCardStatusProps,
  ScheduleCardAction,
  mutedLightColor,
  Row,
  styled,
  blackColor,
} from "@lavii/ds";
import { Container, Space } from "@lavii/ds";
import { TitleLargeText, SubtitleText, RegularText } from "@lavii/ds";
import { alternativeColor, secondaryColor, primaryColor } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import React, { useMemo, useState } from "react";
import { DateHeader, DaysOfWeek } from "./components";
import { useDateNavigation, useDaysOfWeek } from "./logics";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ToggleButtonItemProps {
  onPress: () => void;
  text: string;
}

interface ToggleButtonProps {
  buttons: ToggleButtonItemProps[];
  onActiveButtonChange: (button: ToggleButtonItemProps) => void;
}

const ToggleButtonContainer = styled(Row, {
  backgroundColor: mutedLightColor,
  borderRadius: scaleSize(16),
  padding: scaleSize(4),
});

const ToggleButtonItem = styled<{ active: boolean }, TouchableOpacityProps>(
  TouchableOpacity,
  ({ active }) => ({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: active ? primaryColor : "transparent",
    height: scaleSize(46),
    borderRadius: scaleSize(10),
  })
);

export function ToggleButton({
  buttons,
  onActiveButtonChange,
}: ToggleButtonProps) {
  const [activeButton, setActiveButton] = useState<ToggleButtonItemProps>(
    buttons[0]
  );
  return (
    <ToggleButtonContainer fill crossAlign="center" mainAlign="space-between">
      {buttons.map((button) => (
        <ToggleButtonItem
          key={button.text}
          onPress={() => {
            setActiveButton(button);
            onActiveButtonChange(button);
          }}
          active={activeButton.text === button.text}
        >
          <RegularText.Medium
            color={
              activeButton.text === button.text ? alternativeColor : blackColor
            }
          >
            {button.text}
          </RegularText.Medium>
        </ToggleButtonItem>
      ))}
    </ToggleButtonContainer>
  );
}

export default function ActivitiesScreen() {
  const {
    currentMonth,
    canGoPrevious,
    canGoNext,
    handlePreviousMonth,
    handleNextMonth,
  } = useDateNavigation();

  const { days, selectedDate, handleSelectDay, scrollRef } =
    useDaysOfWeek(currentMonth);

  const headerDate = useMemo(() => {
    const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
    });
    const currentYear = new Date().getFullYear();

    if (currentMonth.getFullYear() > currentYear) {
      return `${monthFormatter.format(
        currentMonth
      )} ${currentMonth.getFullYear()}`;
    }

    return monthFormatter.format(currentMonth);
  }, [currentMonth]);

  return (
    <Container
      backgroundColor={alternativeColor}
      edges={{ top: "maximum", bottom: "maximum" }}
    >
      <TitleLargeText style={{ marginBottom: scaleSize(24) }}>
        Atividade
      </TitleLargeText>
      <DateHeader
        date={headerDate}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
      <DaysOfWeek
        days={days}
        selectedDay={selectedDate}
        onSelectDay={handleSelectDay}
        scrollRef={scrollRef}
      />
      <Space size={scaleSize(16)} />
      <ToggleButton
        buttons={[
          { text: "Pendentes", onPress: () => {} },
          { text: "Concluídos", onPress: () => {} },
        ]}
        onActiveButtonChange={(button) => {
          console.log(button);
        }}
      />
    </Container>
  );
}
