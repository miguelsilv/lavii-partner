import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DayItem } from "./types";

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
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() - 1);
        return newDate;
      });
    }
  }, [canGoPrevious]);

  const handleNextMonth = useCallback(() => {
    if (canGoNext) {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + 1);
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
  const scrollRef = useRef<any>(null);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

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
      if (selectedIndex >= 0) {
        setTimeout(() => {
          scrollRef.current?.scrollToIndex({
            index: selectedIndex,
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

