import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DayItem } from "./types";
import { FlatList } from "react-native";
import { scaleSize } from "@lavii/ds";

export function useDateNavigation() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const canGoPrevious = useMemo(() => {
    const limit = new Date(today.getFullYear(), today.getMonth() - 12, 1);
    const startOfCurrent = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    return startOfCurrent > limit;
  }, [currentMonth, today]);

  const canGoNext = useMemo(() => {
    const limit = new Date(today.getFullYear(), today.getMonth() + 12, 1);
    const startOfCurrent = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    return startOfCurrent < limit;
  }, [currentMonth, today]);

  const handlePreviousMonth = useCallback(() => {
    if (canGoPrevious) {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);

        if (newDate.getMonth() === today.getMonth()) {
          return today;
        }

        return newDate;
      });
    }
  }, [canGoPrevious]);

  const handleNextMonth = useCallback(() => {
    if (canGoNext) {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);

        if (newDate.getMonth() === today.getMonth()) {
          return today;
        }

        return newDate;
      });
    }
  }, [canGoNext]);

  return {
    currentMonth,
    canGoPrevious,
    canGoNext,
    handlePreviousMonth,
    handleNextMonth,
  };
}

export function useDaysOfWeek(currentMonth: Date) {
  const scrollRef = useRef<FlatList<DayItem>>(null);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
      setSelectedDate(currentMonth);
    }
  }, [currentMonth]);

  const days: DayItem[] = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

    const result: DayItem[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);

      const isToday = date.getTime() === today.getTime();

      result.push({
        date,
        day: isToday ? "Hoje" : dayFormatter.format(date),
        selected: false,
        disabled: false,
      });
    }

    return result;
  }, [currentMonth, today]);

  const handleSelectDay = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  useEffect(() => {
    if (scrollRef.current && days.length > 0) {
      const selectedIndex = days.findIndex(
        (d) => d.date.getTime() === selectedDate.getTime()
      );
      if (selectedIndex >= 1) {
        setTimeout(() => {
          scrollRef.current?.scrollToOffset({
            offset: (selectedIndex - 1) * scaleSize(106),
            animated: true,
          });
        }, 100);
      } else {
        const todayIndex = days.findIndex(
          (d) => d.date.getTime() === today.getTime()
        );
        if (todayIndex >= 0) {
          setTimeout(() => {
            scrollRef.current?.scrollToIndex({
              index: todayIndex,
              animated: true,
            });
          }, 100);
        }
      }
    }
  }, [currentMonth, days, selectedDate, today]);

  return { days, selectedDate, handleSelectDay, scrollRef };
}
