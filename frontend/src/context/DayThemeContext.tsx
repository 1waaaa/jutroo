import { createContext, useContext } from "react";

interface DayThemeContextValue {
  isDark: boolean;
}

const DayThemeContext = createContext<DayThemeContextValue>({
  isDark: false,
});

interface Props {
  children: React.ReactNode;
  isDark: boolean;
}

export function DayThemeProvider({ children, isDark }: Props) {
  return (
    <DayThemeContext.Provider value={{ isDark }}>
      {children}
    </DayThemeContext.Provider>
  );
}

export function useDayTheme() {
  return useContext(DayThemeContext);
}
