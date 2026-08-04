export interface Activity {
  id: string;

  title: string;

  emoji: string;

  description: string;

  fixed: boolean;

  earliest: string;

  latest: string;

  defaultDuration: number;
}

export const ACTIVITIES: Activity[] = [
  {
    id: "UNIVERSITY",
    title: "University",
    emoji: "🎓",
    description: "Fixed • 09:00–13:00",
    fixed: true,
    earliest: "09:00",
    latest: "13:00",
    defaultDuration: 240,
  },

  {
    id: "WORK",
    title: "Work",
    emoji: "💼",
    description: "Flexible • 08:00–18:00",
    fixed: false,
    earliest: "08:00",
    latest: "18:00",
    defaultDuration: 480,
  },

  {
    id: "GYM",
    title: "Gym",
    emoji: "🏋️",
    description: "Flexible • After 16:00",
    fixed: false,
    earliest: "16:00",
    latest: "21:00",
    defaultDuration: 60,
  },

  {
    id: "WALK",
    title: "Walk",
    emoji: "🚶",
    description: "Flexible • Evening",
    fixed: false,
    earliest: "18:00",
    latest: "22:00",
    defaultDuration: 45,
  },

  {
    id: "SHOPPING",
    title: "Shopping",
    emoji: "🛍",
    description: "Flexible",
    fixed: false,
    earliest: "10:00",
    latest: "22:00",
    defaultDuration: 90,
  },

  {
    id: "CAFE",
    title: "Cafe",
    emoji: "☕",
    description: "Flexible",
    fixed: false,
    earliest: "08:00",
    latest: "23:00",
    defaultDuration: 60,
  },

  {
    id: "DINNER",
    title: "Dinner",
    emoji: "🍽",
    description: "Flexible",
    fixed: false,
    earliest: "18:00",
    latest: "23:00",
    defaultDuration: 90,
  },

  {
    id: "DATE",
    title: "Date",
    emoji: "❤️",
    description: "Flexible",
    fixed: false,
    earliest: "17:00",
    latest: "23:00",
    defaultDuration: 120,
  },

  {
    id: "CUSTOM",
    title: "Custom",
    emoji: "➕",
    description: "Create your own",
    fixed: false,
    earliest: "00:00",
    latest: "23:59",
    defaultDuration: 60,
  },
];
