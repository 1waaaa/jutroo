import { StyleSheet, Text, View } from "react-native";
import { Clock3 } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  start: string;
  end: string;
  duration: number;
}

export default function ActivitySummaryCard({ start, end, duration }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Clock3 size={22} color={Colors.primary} />

        <Text style={styles.title}>Activity Summary</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time</Text>

        <Text style={styles.value}>
          {start} → {end}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Duration</Text>

        <Text style={styles.value}>{duration} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8FBFF",

    borderRadius: 20,

    padding: 18,

    marginBottom: 24,

    borderWidth: 1,

    borderColor: "#D8E8FA",
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginBottom: 16,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.text,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  label: {
    fontSize: 15,

    color: Colors.subtitle,
  },

  value: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.primary,
  },

  divider: {
    height: 1,

    backgroundColor: "#E8EEF5",

    marginVertical: 14,
  },
});
