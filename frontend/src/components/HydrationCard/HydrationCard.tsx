import { View, Text, StyleSheet } from "react-native";
import { Droplets } from "lucide-react-native";

interface Props {
  waterGoal: number;
}

export default function HydrationCard({ waterGoal }: Props) {
  return (
    <View style={styles.card}>
      <Droplets size={36} color="#38BDF8" />

      <Text style={styles.title}>Hydration Goal</Text>

      <Text style={styles.goal}>{waterGoal}L</Text>

      <Text style={styles.subtitle}>Bring your bottle today.</Text>
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

  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
  },

  goal: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 6,
    color: "#64748B",
  },
});
