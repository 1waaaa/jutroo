export interface DayPalette {
  top: string;
  bottom: string;
}

export const DAY_PALETTES = {
  dawn: {
    top: "#E7EFF7",
    bottom: "#FFF4DD",
  },

  morning: {
    top: "#E8F4FC",
    bottom: "#FCFBF8",
  },

  midday: {
    top: "#DDF0FC",
    bottom: "#FAFCFD",
  },

  afternoon: {
    top: "#E5F1F9",
    bottom: "#FFF5E4",
  },

  goldenHour: {
    top: "#E8E9EF",
    bottom: "#FFE9C8",
  },

  evening: {
    top: "#DCE5EF",
    bottom: "#F5E8E3",
  },

  night: {
    top: "#DDE4EC",
    bottom: "#F3F5F7",
  },
};

export interface DayPhase {
  name: keyof typeof DAY_PALETTES;
  start: number;
  end: number;
}

export const DAY_PHASES: DayPhase[] = [
  {
    name: "night",
    start: 0,
    end: 330,
  },

  {
    name: "dawn",
    start: 330,
    end: 420,
  },

  {
    name: "morning",
    start: 420,
    end: 660,
  },

  {
    name: "midday",
    start: 660,
    end: 900,
  },

  {
    name: "afternoon",
    start: 900,
    end: 1080,
  },

  {
    name: "goldenHour",
    start: 1080,
    end: 1230,
  },

  {
    name: "evening",
    start: 1230,
    end: 1380,
  },

  {
    name: "night",
    start: 1380,
    end: 1440,
  },
];

export function getDayPhase(minutes: number): DayPhase {
  const safeMinutes = Math.max(0, Math.min(1439, minutes));

  return (
    DAY_PHASES.find(
      (phase) => safeMinutes >= phase.start && safeMinutes < phase.end,
    ) ?? DAY_PHASES[0]
  );
}
