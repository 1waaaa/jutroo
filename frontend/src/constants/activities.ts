export interface Activity {
  id: string;
  title: string;
  emoji: string;
  supportsTimeRange: boolean;
}

export interface ConfiguredActivity {
  id: string;

  duration?: number;

  preferredTime?: "Morning" | "Afternoon" | "Evening";

  startTime?: string;

  endTime?: string;
}

export const ACTIVITIES: Activity[] = [
  {
    id: "UNIVERSITY",
    title: "University",
    emoji: "🎓",
    supportsTimeRange: true,
  },

  {
    id: "WORK",
    title: "Work",
    emoji: "💼",
    supportsTimeRange: true,
  },

  {
    id: "GYM",
    title: "Gym",
    emoji: "🏋️",
    supportsTimeRange: false,
  },

  {
    id: "WALK",
    title: "Walk",
    emoji: "🚶",
    supportsTimeRange: false,
  },

  {
    id: "SHOPPING",
    title: "Shopping",
    emoji: "🛍",
    supportsTimeRange: false,
  },

  {
    id: "CAFE",
    title: "Cafe",
    emoji: "☕",
    supportsTimeRange: false,
  },

  {
    id: "DINNER",
    title: "Dinner",
    emoji: "🍽",
    supportsTimeRange: false,
  },

  {
    id: "DATE",
    title: "Date",
    emoji: "❤️",
    supportsTimeRange: false,
  },

  {
    id: "STUDY",
    title: "Study",
    emoji: "📚",
    supportsTimeRange: false,
  },

  {
    id: "FAMILY",
    title: "Family",
    emoji: "👨‍👩‍👧",
    supportsTimeRange: false,
  },

  {
    id: "CUSTOM",
    title: "Custom",
    emoji: "➕",
    supportsTimeRange: false,
  },
];
