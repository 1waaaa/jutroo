import { createContext, useContext, useEffect, useState } from "react";

import { DAY_PALETTES, getDayPhase, DayPhase } from "../theme/dayTheme";

interface DayThemeContextValue {
  isDark: boolean;

  phase: DayPhase;

  palette: {
    top: string;
    bottom: string;
  };
}

const DayThemeContext = createContext<DayThemeContextValue | undefined>(
  undefined,
);

function getCurrentMinutes() {
  const now = new Date();

  return now.getHours() * 60 + now.getMinutes();
}

export function DayThemeProvider({ children }: { children: React.ReactNode }) {
  const [minutes, setMinutes] = useState(getCurrentMinutes());

  useEffect(() => {
    const updateTime = () => {
      setMinutes(getCurrentMinutes());
    };

    // odmah proveri trenutno vreme
    updateTime();

    // zatim proveravaj svaki minut
    const interval = setInterval(updateTime, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const phase = getDayPhase(minutes);

  const palette = DAY_PALETTES[phase.name];

  const isDark = phase.name === "evening" || phase.name === "night";

  return (
    <DayThemeContext.Provider
      value={{
        isDark,
        phase,
        palette,
      }}
    >
      {children}
    </DayThemeContext.Provider>
  );
}

export function useDayTheme() {
  const context = useContext(DayThemeContext);

  if (!context) {
    throw new Error("useDayTheme must be used inside DayThemeProvider");
  }

  return context;
}
