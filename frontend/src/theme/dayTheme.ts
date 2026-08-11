export interface DayPalette {
  top: string;
  bottom: string;
}

export const DAY_PALETTES = {
  dawn: {
    top: "#DCE8F2",
    bottom: "#F8E9D4",
  },

  morning: {
    top: "#DCEFFA",
    bottom: "#F9FBFC",
  },

  midday: {
    top: "#D5ECFA",
    bottom: "#F7FBFD",
  },

  afternoon: {
    top: "#DCEAF4",
    bottom: "#F8EBD8",
  },

  goldenHour: {
    top: "#D8DCE5",
    bottom: "#F2D7B5",
  },

  evening: {
    top: "#34485E",
    bottom: "#25394F",
  },

  night: {
    top: "#18283A",
    bottom: "#223A52",
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
