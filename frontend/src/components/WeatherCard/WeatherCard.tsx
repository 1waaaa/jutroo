import { StyleSheet, Text, View } from "react-native";

import { Sun, CloudSun, Cloud, CloudRain, Moon } from "lucide-react-native";

import { Colors } from "../../theme/colors";

import WeatherVideoBackground from "./WeatherVideoBackground";

import { useDayTheme } from "../../context/DayThemeContext";

interface Props {
  temperature: number;
  condition: string;
  uv: number;
  feelsLike: number;
}

export default function WeatherCard({
  temperature,
  condition,
  uv,
  feelsLike,
}: Props) {
  const { isDark } = useDayTheme();

  const textColor = isDark ? "#FFFFFF" : Colors.text;

  const subtitleColor = isDark ? "rgba(255,255,255,0.72)" : Colors.subtitle;

  return (
    <View style={styles.card}>
      <WeatherVideoBackground condition={condition} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: subtitleColor,
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

        <View style={styles.temperatureRow}>
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

          <View style={styles.detailsContainer}>
            <Text
              style={[
                styles.detail,
                {
                  color: subtitleColor,
                },
              ]}
            >
              Feels like {feelsLike}°
            </Text>

            <View
              style={[
                styles.dot,
                {
                  backgroundColor: subtitleColor,
                },
              ]}
            />

            <Text
              style={[
                styles.detail,
                {
                  color: subtitleColor,
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
  card: {
    minHeight: 280,

    borderRadius: 30,

    marginBottom: 20,

    overflow: "hidden",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.55)",

    shadowColor: Colors.text,

    shadowOpacity: 0.06,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 3,
  },

  content: {
    flex: 1,

    padding: 24,

    justifyContent: "space-between",
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  label: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 1.5,
  },

  condition: {
    marginTop: 6,

    fontSize: 25,

    fontWeight: "700",
  },

  iconContainer: {
    width: 58,

    height: 58,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.55)",

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.65)",
  },

  iconContainerDark: {
    backgroundColor: "rgba(255,255,255,0.14)",

    borderColor: "rgba(255,255,255,0.28)",
  },

  temperatureRow: {
    marginTop: 30,
  },

  temperature: {
    fontSize: 58,

    fontWeight: "800",

    letterSpacing: -3,
  },

  detailsContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 4,
  },

  detail: {
    fontSize: 15,

    fontWeight: "600",
  },

  dot: {
    width: 4,

    height: 4,

    borderRadius: 2,

    marginHorizontal: 9,
  },
});
