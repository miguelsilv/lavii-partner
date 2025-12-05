import React, { RefObject } from "react";
import { FlatList } from "react-native";

export interface DayItem {
  date: Date;
  day: string;
  selected: boolean;
  disabled?: boolean;
}

export interface TimeSlotItem {
  time: string;
  selected: boolean;
  availableCount?: number;
}

export interface DaysOfWeekProps {
  days: DayItem[];
  selectedDay: Date | null;
  onSelectDay: (date: Date) => void;
  scrollRef?: RefObject<FlatList<DayItem> | null>;
}

export interface TimeSlotsProps {
  timeSlots: TimeSlotItem[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  loading?: boolean;
}

export interface DateHeaderProps {
  date: string;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

