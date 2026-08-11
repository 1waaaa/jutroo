export interface ScheduleItem {
  id: number;
  title: string;
  start: string;
  end: string;
}

export const mockSchedule: ScheduleItem[] = [
  {
    id: 1,
    title: "University",
    start: "09:00",
    end: "13:00",
  },

  {
    id: 2,
    title: "Lunch",
    start: "13:15",
    end: "14:00",
  },

  {
    id: 3,
    title: "Gym",
    start: "16:00",
    end: "17:00",
  },

  {
    id: 4,
    title: "Cafe",
    start: "19:00",
    end: "19:45",
  },
];
