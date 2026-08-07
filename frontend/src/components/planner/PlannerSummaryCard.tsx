import { StyleSheet, Text, View } from "react-native";
import { CalendarDays, Clock3 } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  activityCount: number;
  totalMinutes: number;
}

export default function PlannerSummaryCard({
  activityCount,
  totalMinutes,
}: Props) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration =
    hours > 0
      ? `${hours}h ${minutes > 0 ? ` ${minutes}m` : ""}`
      : `${minutes} min`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Summary</Text>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.left}>
          <CalendarDays size={20} color={Colors.primary} />

          <Text style={styles.label}>Activities</Text>
        </View>

        <Text style={styles.value}>{activityCount}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.left}>
          <Clock3 size={20} color={Colors.primary} />

          <Text style={styles.label}>Planned Time</Text>
        </View>

        <Text style={styles.value}>{duration}</Text>
      </View>

      <View style={styles.readyCard}>
        <Text style={styles.readyTitle}>✨ Ready to Generate</Text>

        <Text style={styles.readyText}>
          Everything looks good. Our AI will now build the best schedule around
          today's weather and your activities.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    borderRadius: 22,

    padding: 22,

    marginTop: 8,

    marginBottom: 26,

    borderWidth: 1,

    borderColor: "#EEF2F7",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,
  },

  divider: {
    height: 1,

    backgroundColor: "#EEF2F7",

    marginVertical: 18,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,
  },

  left: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,
  },

  label: {
    fontSize: 16,

    color: Colors.subtitle,

    fontWeight: "600",
  },

  value: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.text,
  },

  readyCard: {
    marginTop: 10,

    padding: 18,

    borderRadius: 18,

    backgroundColor: "#F7FBFF",

    borderWidth: 1,

    borderColor: "#D8ECFF",
  },

  readyTitle: {
    fontSize: 17,

    fontWeight: "700",

    color: Colors.primary,

    marginBottom: 8,
  },

  readyText: {
    color: Colors.subtitle,

    fontSize: 15,

    lineHeight: 22,
  },
});
