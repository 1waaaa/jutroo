import { createContext, ReactNode, useContext, useState } from "react";

import { ScheduleItem } from "../types/schedule";

interface PlannerContextType {
  schedule: ScheduleItem[];

  hasSchedule: boolean;

  setSchedule: (schedule: ScheduleItem[]) => void;

  clearSchedule: () => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [schedule, setScheduleState] = useState<ScheduleItem[]>([]);

  function setSchedule(items: ScheduleItem[]) {
    setScheduleState(items);
  }

  function clearSchedule() {
    setScheduleState([]);
  }

  return (
    <PlannerContext.Provider
      value={{
        schedule,
        hasSchedule: schedule.length > 0,
        setSchedule,
        clearSchedule,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);

  if (!context) {
    throw new Error("usePlanner must be used inside PlannerProvider");
  }

  return context;
}
