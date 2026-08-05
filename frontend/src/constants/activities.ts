export interface Activity {
  id: string;
  title: string;
  emoji: string;
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

export const ACTIVITIES: Activity[] = [
  {
    id: "UNIVERSITY",
    title: "University",
    emoji: "🎓",
    minTime: "08:00",
    maxTime: "20:00",
  },

  {
    id: "WORK",
    title: "Work",
    emoji: "💼",
    minTime: "08:00",
    maxTime: "20:00",
  },

  {
    id: "GYM",
    title: "Gym",
    emoji: "🏋️",
    minTime: "16:00",
    maxTime: "22:00",
  },

  {
    id: "WALK",
    title: "Walk",
    emoji: "🚶",
    minTime: "06:00",
    maxTime: "22:00",
  },

  {
    id: "SHOPPING",
    title: "Shopping",
    emoji: "🛍️",
    minTime: "09:00",
    maxTime: "21:00",
  },

  {
    id: "CAFE",
    title: "Cafe",
    emoji: "☕",
    minTime: "08:00",
    maxTime: "23:00",
  },

  {
    id: "DINNER",
    title: "Dinner",
    emoji: "🍽️",
    minTime: "17:00",
    maxTime: "23:00",
  },

  {
    id: "DATE",
    title: "Date",
    emoji: "❤️",
    minTime: "17:00",
    maxTime: "23:30",
  },

  {
    id: "CUSTOM",
    title: "Custom",
    emoji: "✨",
    minTime: "00:00",
    maxTime: "23:30",
  },
];

export const DURATIONS = [30, 45, 60, 90, 120, 180, 240];
