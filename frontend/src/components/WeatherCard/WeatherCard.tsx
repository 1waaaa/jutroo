import { StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../../theme/colors";
import { useDayTheme } from "../../context/DayThemeContext";

import WeatherVideoBackground from "./WeatherVideoBackground";

interface Props {
  temperature: number;
  condition: string;
  uv: number;
  feelsLike: number;
}

function isDarkWeather(condition: string) {
  const normalized = condition.toLowerCase();

  return (
    normalized.includes("night") ||
    normalized.includes("moon") ||
    normalized.includes("rain") ||
    normalized.includes("drizzle") ||
    normalized.includes("cloud") ||
    normalized.includes("overcast")
  );
}

export default function WeatherCard({
  temperature,
  condition,
  uv,
  feelsLike,
}: Props) {
  const { isDark } = useDayTheme();

  const dark = isDark || isDarkWeather(condition);

  const textColor = dark ? "#FFFFFF" : Colors.text;

  const secondaryColor = dark ? "rgba(255,255,255,0.78)" : Colors.subtitle;

  return (
    <View style={styles.hero}>
      <WeatherVideoBackground condition={condition} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: secondaryColor,
                },
              ]}
            >
              WEATHER NOW
            </Text>

            <Text
              style={[
                styles.condition,
                {
                  color: textColor,
                },
              ]}
            >
              {condition}
            </Text>
          </View>
        </View>

        <View style={styles.temperatureSection}>
          <Text
            style={[
              styles.temperature,
              {
                color: textColor,
              },
            ]}
          >
            {temperature}°
          </Text>

          <View style={styles.details}>
            <Text
              style={[
                styles.detail,
                {
                  color: secondaryColor,
                },
              ]}
            >
              Feels like {feelsLike}°
            </Text>

            <View
              style={[
                styles.dot,
                {
                  backgroundColor: secondaryColor,
                },
              ]}
            />

            <Text
              style={[
                styles.detail,
                {
                  color: secondaryColor,
                },
              ]}
            >
              UV {uv}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 380,

    marginHorizontal: -22,

    marginTop: 0,

    marginBottom: 0,

    position: "relative",

    overflow: "hidden",
  },

  content: {
    flex: 1,

    paddingHorizontal: 28,

    paddingTop: 70,

    paddingBottom: 80,

    justifyContent: "space-between",

    zIndex: 2,
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  label: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 7,
  },

  condition: {
    fontSize: 28,

    fontWeight: "800",

    letterSpacing: -0.6,
  },

  temperatureSection: {
    alignItems: "flex-start",
  },

  temperature: {
    fontSize: 62,

    fontWeight: "800",

    letterSpacing: -3,
  },

  details: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 2,
  },

  detail: {
    fontSize: 14,

    fontWeight: "600",
  },

  dot: {
    width: 4,

    height: 4,

    borderRadius: 2,

    marginHorizontal: 9,
  },
});
