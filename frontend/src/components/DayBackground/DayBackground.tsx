import { ReactNode, useEffect, useRef, useState } from "react";

import { Animated, StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useDayTheme } from "../../context/DayThemeContext";

interface Props {
  children: ReactNode;
}

export default function DayBackground({ children }: Props) {
  const { palette, phase } = useDayTheme();

  const [displayedPalette, setDisplayedPalette] = useState(palette);

  const fade = useRef(new Animated.Value(1)).current;

  const { isDark } = useDayTheme();

  useEffect(() => {
    if (
      displayedPalette.top === palette.top &&
      displayedPalette.bottom === palette.bottom
    ) {
      return;
    }

    Animated.sequence([
      Animated.timing(fade, {
        toValue: 0.65,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    setDisplayedPalette(palette);
  }, [phase.name, palette.top, palette.bottom]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[displayedPalette.top, displayedPalette.bottom]}
        start={{
          x: 0.15,
          y: 0,
        }}
        end={{
          x: 0.85,
          y: 1,
        }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            opacity: isDark ? 0 : fade,
          },
        ]}
      >
        <LinearGradient
          colors={[palette.top, "rgba(255,255,255,0)"]}
          start={{
            x: 0.5,
            y: 0,
          }}
          end={{
            x: 0.5,
            y: 1,
          }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  glow: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    height: "55%",
  },
});
