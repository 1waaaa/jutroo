import { View, Text, StyleSheet } from "react-native";
import { Sun, CloudSun, Cloud, CloudRain, Moon } from "lucide-react-native";

import { Colors } from "../../theme/colors";

import WeatherBackground from "./WeatherBackground";
import WeatherVideoBackground from "./WeatherVideoBackground";

interface Props {
  temperature: number;
  condition: string;
  uv: number;
  feelsLike: number;
}

function WeatherIcon({ condition }: { condition: string }) {
  const normalizedCondition = condition.toLowerCase();

  if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle")
  ) {
    return <CloudRain size={42} color={Colors.primary} />;
  }

  if (
    normalizedCondition.includes("partly") ||
    normalizedCondition.includes("partially")
  ) {
    return <CloudSun size={42} color={Colors.accent} />;
  }

  if (
    normalizedCondition.includes("cloud") ||
    normalizedCondition.includes("overcast")
  ) {
    return <Cloud size={42} color={Colors.text} />;
  }

  if (
    normalizedCondition.includes("night") ||
    normalizedCondition.includes("moon")
  ) {
    return <Moon size={42} color={Colors.accent} />;
  }

  return <Sun size={46} color={Colors.accent} />;
}

export default function WeatherCard({
  temperature,
  condition,
  uv,
  feelsLike,
}: Props) {
  return (
    <View style={styles.card}>
      <WeatherVideoBackground condition={condition} />

      <WeatherBackground condition={condition} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.label}>WEATHER NOW</Text>

            <Text style={styles.condition}>{condition}</Text>
          </View>

          {/* NEMA VISE BELOG OKVIRA */}
          <View style={styles.iconContainer}>
            <WeatherIcon condition={condition} />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.temperature}>{temperature}°</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Feels like {feelsLike}°</Text>

            <View style={styles.dot} />

            <Text style={styles.detail}>UV {uv}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 330,

    backgroundColor: Colors.surface,

    borderRadius: 30,

    marginBottom: 20,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 24,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 4,
  },

  content: {
    flex: 1,

    padding: 28,

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

    letterSpacing: 3.5,

    color: Colors.text,

    opacity: 0.65,
  },

  condition: {
    marginTop: 8,

    fontSize: 28,

    fontWeight: "700",

    color: Colors.text,
  },

  iconContainer: {
    width: 58,
    height: 58,

    justifyContent: "center",
    alignItems: "center",
  },

  bottomSection: {
    marginBottom: 4,
  },

  temperature: {
    fontSize: 82,

    fontWeight: "800",

    letterSpacing: -4,

    lineHeight: 88,

    color: Colors.text,
  },

  detailsContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,
  },

  detail: {
    fontSize: 17,

    fontWeight: "500",

    color: Colors.text,

    opacity: 0.72,
  },

  dot: {
    width: 5,
    height: 5,

    borderRadius: 10,

    backgroundColor: Colors.text,

    opacity: 0.5,

    marginHorizontal: 14,
  },
});
