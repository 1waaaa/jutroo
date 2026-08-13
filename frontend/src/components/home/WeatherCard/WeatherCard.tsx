import { Image, StyleSheet, Text, View } from "react-native";

import { MapPin } from "lucide-react-native";

import { Colors } from "../../../theme/colors";
import { useDayTheme } from "../../../context/DayThemeContext";
import { useOnboarding } from "../../../context/OnboardingContext";

import WeatherVideoBackground from "./WeatherVideoBackground";

interface Props {
  temperature: number;
  condition: string;
  uv: number;
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

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  }

  if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  }

  if (hour >= 18 && hour < 23) {
    return "Good evening";
  }

  return "Good night";
}

function formatName(name?: string | null) {
  if (!name) {
    return "";
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function WeatherCard({ temperature, condition, uv }: Props) {
  const { isDark } = useDayTheme();

  const { data } = useOnboarding();

  const dark = isDark || isDarkWeather(condition);

  const textColor = dark ? "#FFFFFF" : Colors.text;

  const secondaryColor = dark ? "rgba(255,255,255,0.78)" : Colors.subtitle;

  const greeting = getGreeting();

  const name = formatName(data.username) || "Your Name";

  return (
    <View style={styles.hero}>
      <WeatherVideoBackground condition={condition} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.greetingBlock}>
            <Text
              style={[
                styles.greetingEyebrow,
                {
                  color: secondaryColor,
                },
              ]}
            >
              {greeting.toUpperCase()}
            </Text>

            <Text
              style={[
                styles.greetingName,
                {
                  color: textColor,
                },
              ]}
            >
              {name}
            </Text>

            <View style={styles.locationRow}>
              <MapPin size={12} color="#E98B7C" strokeWidth={2.2} />

              <Text
                style={[
                  styles.locationText,
                  {
                    color: secondaryColor,
                  },
                ]}
              >
                {data.city || "Your location"}
              </Text>
            </View>
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

    paddingTop: 72,

    paddingBottom: 80,

    justifyContent: "space-between",

    zIndex: 2,
  },

  topRow: {
    width: "100%",

    alignItems: "center",
  },

  greetingBlock: {
    alignItems: "center",
  },

  greetingEyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 3.2,

    marginBottom: 3,
  },

  greetingName: {
    fontSize: 25,

    fontWeight: "700",

    letterSpacing: -0.7,

    marginBottom: 5,
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  locationText: {
    marginLeft: 5,

    fontSize: 12,

    fontWeight: "600",

    letterSpacing: 0.15,
  },

  greeting: {
    fontSize: 24,

    fontWeight: "800",

    letterSpacing: -0.7,

    marginBottom: 5,
  },

  location: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 24,
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
