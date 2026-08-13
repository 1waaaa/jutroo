export interface Activity {
  id: string;
  title: string;
  minTime: string;
  maxTime: string;
}

export interface ConfiguredActivity {
  type: string;
  duration: number;
  fixed: boolean;
  earliest: string;
  latest: string;
}

export const FIXED_ACTIVITIES = ["UNIVERSITY", "WORK"];

export const FLEXIBLE_ACTIVITIES = [
  "GYM",
  "WALK",
  "SHOPPING",
  "CAFE",
  "DINNER",
  "DATE",
];

export const ACTIVITIES: Activity[] = [
  {
    id: "UNIVERSITY",
    title: "University",
    minTime: "08:00",
    maxTime: "20:00",
  },
  {
    id: "WORK",
    title: "Work",
    minTime: "08:00",
    maxTime: "20:00",
  },
  {
    id: "GYM",
    title: "Gym",
    minTime: "16:00",
    maxTime: "22:00",
  },
  {
    id: "WALK",
    title: "Walk",
    minTime: "06:00",
    maxTime: "22:00",
  },
  {
    id: "SHOPPING",
    title: "Shopping",
    minTime: "09:00",
    maxTime: "21:00",
  },
  {
    id: "CAFE",
    title: "Cafe",
    minTime: "08:00",
    maxTime: "23:00",
  },
  {
    id: "DINNER",
    title: "Dinner",
    minTime: "17:00",
    maxTime: "23:00",
  },
  {
    id: "DATE",
    title: "Date",
    minTime: "17:00",
    maxTime: "23:30",
  },
];

export const DURATIONS = [30, 45, 60, 90, 120, 180, 240];
