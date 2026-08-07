export interface ScheduleItem {
  id: number;
  emoji: string;
  title: string;
  start: string;
  end: string;
}

export const mockSchedule: ScheduleItem[] = [
  {
    id: 1,
    emoji: "🎓",
    title: "University",
    start: "09:00",
    end: "13:00",
  },
  {
    id: 2,
    emoji: "🍽️",
    title: "Lunch",
    start: "13:15",
    end: "14:00",
  },
  {
    id: 3,
    emoji: "🏋️",
    title: "Gym",
    start: "16:00",
    end: "17:00",
  },
  {
    id: 4,
    emoji: "☕",
    title: "Cafe",
    start: "19:00",
    end: "19:45",
  },
];
