import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { Colors } from "../../../theme/colors";

interface Props {
  condition: string;
}

export default function WeatherBackground({ condition }: Props) {
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const cloudAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ]),
    );

    const cloudLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(cloudAnimation, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnimation, {
          toValue: 0,
          duration: 7000,
          useNativeDriver: true,
        }),
      ]),
    );

    glowLoop.start();
    cloudLoop.start();

    return () => {
      glowLoop.stop();
      cloudLoop.stop();
    };
  }, []);

  const glowScale = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });

  const glowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.18, 0.35],
  });

  const cloudTranslateX = cloudAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 20],
  });

  const normalizedCondition = condition.toLowerCase();

  const isSunny =
    normalizedCondition.includes("sun") ||
    normalizedCondition.includes("clear");

  const isCloudy = normalizedCondition.includes("cloud");

  if (isSunny) {
    return (
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.sunGlowLarge,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.sunGlowSmall,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />
      </View>
    );
  }

  if (isCloudy) {
    return (
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.cloud,
            styles.cloudOne,
            {
              transform: [
                {
                  translateX: cloudTranslateX,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.cloud,
            styles.cloudTwo,
            {
              transform: [
                {
                  translateX: Animated.multiply(cloudTranslateX, -0.7),
                },
              ],
            },
          ]}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  sunGlowLarge: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: Colors.accent,
    top: -100,
    right: -60,
  },

  sunGlowSmall: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primary,
    bottom: -80,
    left: -40,
  },

  cloud: {
    position: "absolute",
    width: 180,
    height: 80,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.22)",
  },

  cloudOne: {
    top: 20,
    right: -70,
  },

  cloudTwo: {
    bottom: -10,
    left: -80,
    opacity: 0.7,
  },
});
