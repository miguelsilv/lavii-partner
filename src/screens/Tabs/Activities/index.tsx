import { TabGroup, ScheduleCard, primaryLightColor, OrderStatus, secondaryLightColor, mutedColor, ScheduleCardStatusProps, ScheduleCardAction, mutedLightColor } from "@lavii/ds";
import { Container, Space } from "@lavii/ds";
import { TitleLargeText, SubtitleText, RegularText } from "@lavii/ds";
import { alternativeColor, secondaryColor, primaryColor } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import React, { useMemo } from "react";
import { DateHeader, DaysOfWeek } from "./components";
import { useDateNavigation, useDaysOfWeek } from "./logics";

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
    const monthFormatter = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" });
    const currentYear = new Date().getFullYear();

    if (currentMonth.getFullYear() > currentYear) {
      return `${monthFormatter.format(currentMonth)} ${currentMonth.getFullYear()}`;
    }

    return monthFormatter.format(currentMonth);
  }, [currentMonth]);

  return (
    <Container backgroundColor={alternativeColor} edges={{ top: "maximum", bottom: "maximum" }}>
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
      <Space size={scaleSize(48)} />

    </Container>
  );
}
