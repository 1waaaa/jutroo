import { View, Text, StyleSheet } from "react-native";
import { Sun } from "lucide-react-native";

import { Colors } from "../../theme/colors";

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
  return (
    <View style={styles.card}>
      <Sun size={42} color={Colors.accent} />

      <Text style={styles.temp}>{temperature}°</Text>

      <Text style={styles.condition}>{condition}</Text>

      <Text style={styles.details}>
        Feels like {feelsLike}° • UV {uv}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  temp: {
    marginTop: 10,
    fontSize: 42,
    fontWeight: "800",
  },

  condition: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "600",
  },

  details: {
    marginTop: 8,
    color: "#64748B",
  },
});
