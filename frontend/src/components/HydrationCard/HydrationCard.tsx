import { useEffect, useMemo, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { Droplets, Plus } from "lucide-react-native";

import { Colors } from "../../theme/colors";

import { useDayTheme } from "../../context/DayThemeContext";

interface Props {
  waterGoal: number;
}

const STORAGE_KEY = "dailyWater";

const CIRCLE_SIZE = 150;
const STROKE_WIDTH = 10;

const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;

const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const WATER_AMOUNTS = [250, 500, 750, 1000];

/*
 * Local date instead of UTC date.
 *
 * This means hydration resets exactly
 * at the user's local midnight.
 */
function getLocalDateKey() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function HydrationCard({ waterGoal }: Props) {
  const { isDark } = useDayTheme();

  const [consumed, setConsumed] = useState(0);

  const [showOptions, setShowOptions] = useState(false);

  const goalMl = waterGoal * 1000;

  const progress = useMemo(() => {
    if (!goalMl) {
      return 0;
    }

    return Math.min(consumed / goalMl, 1);
  }, [consumed, goalMl]);

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const textColor = isDark ? "#FFFFFF" : Colors.text;

  const subtitleColor = isDark ? "rgba(255,255,255,0.68)" : Colors.subtitle;

  const mutedColor = isDark ? "rgba(255,255,255,0.55)" : Colors.subtitle;

  useEffect(() => {
    loadWater();
  }, []);

  async function loadWater() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setConsumed(0);
        return;
      }

      const data = JSON.parse(stored);

      const today = getLocalDateKey();

      if (data.date !== today) {
        await AsyncStorage.removeItem(STORAGE_KEY);

        setConsumed(0);
        return;
      }

      setConsumed(data.amount ?? 0);
    } catch (error) {
      console.log("Failed to load water:", error);
    }
  }

  async function addWater(amount: number) {
    const newAmount = consumed + amount;

    setConsumed(newAmount);

    setShowOptions(false);

    try {
      const today = getLocalDateKey();

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          date: today,
          amount: newAmount,
        }),
      );
    } catch (error) {
      console.log("Failed to save water:", error);
    }
  }

  function getMessage() {
    if (progress >= 1) {
      return {
        title: "Goal reached!",
        subtitle: "Amazing work today.",
      };
    }

    if (progress >= 0.7) {
      return {
        title: "Great job!",
        subtitle: "You're almost there.",
      };
    }

    if (progress >= 0.4) {
      return {
        title: "You're on track!",
        subtitle: "Keep drinking water.",
      };
    }

    return {
      title: "Stay hydrated!",
      subtitle: "Don't forget your water today.",
    };
  }

  const message = getMessage();

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.eyebrow,
              {
                color: mutedColor,
              },
            ]}
          >
            HYDRATION
          </Text>

          <Text
            style={[
              styles.title,
              {
                color: textColor,
              },
            ]}
          >
            Water Intake
          </Text>
        </View>

        <Pressable
          style={[styles.headerButton, isDark && styles.headerButtonDark]}
          onPress={() => setShowOptions((previous) => !previous)}
        >
          <Plus size={20} color={textColor} />
        </Pressable>
      </View>

      {/* MAIN */}

      <View style={styles.main}>
        <View style={styles.circleContainer}>
          <Svg
            width={CIRCLE_SIZE}
            height={CIRCLE_SIZE}
            viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
          >
            <Defs>
              <LinearGradient
                id="waterGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <Stop offset="0%" stopColor={Colors.primary} />

                <Stop offset="100%" stopColor={Colors.success} />
              </LinearGradient>
            </Defs>

            {/* Background ring */}

            <Circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke={isDark ? "rgba(255,255,255,0.15)" : Colors.primaryLight}
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />

            {/* Progress ring */}

            <Circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={RADIUS}
              stroke="url(#waterGradient)"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              rotation="-90"
              origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
            />
          </Svg>

          <View style={styles.circleContent}>
            <Droplets size={24} color={Colors.primary} />

            <Text
              style={[
                styles.amount,
                {
                  color: textColor,
                },
              ]}
            >
              {(consumed / 1000).toFixed(1)} L
            </Text>

            <Text
              style={[
                styles.ofText,
                {
                  color: subtitleColor,
                },
              ]}
            >
              of {waterGoal.toFixed(1)} L
            </Text>
          </View>
        </View>

        <View style={styles.message}>
          <Text
            style={[
              styles.messageTitle,
              {
                color: textColor,
              },
            ]}
          >
            {message.title}
          </Text>

          <Text
            style={[
              styles.messageSubtitle,
              {
                color: subtitleColor,
              },
            ]}
          >
            {message.subtitle}
          </Text>
        </View>
      </View>

      {/* WATER OPTIONS */}

      {showOptions ? (
        <View style={styles.options}>
          {WATER_AMOUNTS.map((amount) => (
            <Pressable
              key={amount}
              style={[styles.waterOption, isDark && styles.waterOptionDark]}
              onPress={() => addWater(amount)}
            >
              <Text
                style={[
                  styles.waterOptionText,
                  isDark && styles.waterOptionTextDark,
                ]}
              >
                +{amount >= 1000 ? "1 L" : `${amount} ml`}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <Pressable
          style={[styles.logButton, isDark && styles.logButtonDark]}
          onPress={() => setShowOptions(true)}
        >
          <Text style={styles.logButtonText}>Log Water</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
    paddingHorizontal: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: 3,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.55)",

    justifyContent: "center",
    alignItems: "center",
  },

  headerButtonDark: {
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,

    justifyContent: "center",
    alignItems: "center",
  },

  circleContent: {
    position: "absolute",

    justifyContent: "center",
    alignItems: "center",
  },

  amount: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "800",
  },

  ofText: {
    marginTop: 1,
    fontSize: 13,
    fontWeight: "500",
  },

  message: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 8,
  },

  messageTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  messageSubtitle: {
    fontSize: 15,
    lineHeight: 21,
  },

  logButton: {
    marginTop: 16,
    height: 48,
    borderRadius: 16,

    backgroundColor: "rgba(255,255,255,0.45)",

    borderWidth: 1,

    borderColor: "rgba(124,184,232,0.45)",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 8,
  },

  logButtonDark: {
    backgroundColor: "rgba(255,255,255,0.10)",

    borderColor: "rgba(124,184,232,0.55)",
  },

  logButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary,
  },

  options: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },

  waterOption: {
    flex: 1,
    height: 46,
    borderRadius: 15,

    backgroundColor: Colors.primaryLight,

    justifyContent: "center",
    alignItems: "center",
  },

  waterOptionDark: {
    backgroundColor: "rgba(124,184,232,0.15)",
  },

  waterOptionText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
  },

  waterOptionTextDark: {
    color: "#FFFFFF",
  },
});
