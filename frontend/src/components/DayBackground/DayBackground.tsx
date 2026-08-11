import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { Animated, StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { DAY_PALETTES, getDayPhase } from "../../theme/dayTheme";

interface Props {
  children: ReactNode;
}

export default function DayBackground({ children }: Props) {
  const getCurrentMinutes = () => {
    const now = new Date();

    return now.getHours() * 60 + now.getMinutes();
  };

  const [minutes, setMinutes] = useState(getCurrentMinutes());

  const currentPhase = useMemo(() => getDayPhase(minutes), [minutes]);

  const [palette, setPalette] = useState(DAY_PALETTES[currentPhase.name]);

  const fade = useRef(new Animated.Value(1)).current;

  /*
   * Update once per minute.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes(getCurrentMinutes());
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /*
   * Smoothly transition when
   * the day phase changes.
   */
  useEffect(() => {
    const nextPalette = DAY_PALETTES[currentPhase.name];

    if (
      nextPalette.top === palette.top &&
      nextPalette.bottom === palette.bottom
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

    setPalette(nextPalette);
  }, [currentPhase.name]);

  return (
    <View style={styles.container}>
      {/* Main atmospheric gradient */}
      <LinearGradient
        colors={[palette.top, palette.bottom]}
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

      {/* Very subtle soft light */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            opacity: fade,
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
