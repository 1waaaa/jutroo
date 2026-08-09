import { StyleSheet, Text, View } from "react-native";
import { Clock3 } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  start: string;
  end: string;
  duration: number;
  fixed: boolean;
}

export default function ActivitySummaryCard({
  start,
  end,
  duration,
  fixed,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Clock3 size={20} color={Colors.primary} />

        <Text style={styles.title}>Activity Summary</Text>
      </View>

      {fixed ? (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>

            <Text style={styles.value}>
              {start} → {end}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Earliest Start</Text>

            <Text style={styles.value}>{start}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Latest Start</Text>

            <Text style={styles.value}>{end}</Text>
          </View>
        </>
      )}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Duration</Text>

        <Text style={styles.value}>{duration} min</Text>
      </View>

      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{fixed ? "FIXED" : "FLEXIBLE"}</Text>
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

    marginBottom: 18,
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

    gap: 20,
  },

  label: {
    fontSize: 15,

    color: Colors.subtitle,

    flex: 1,
  },

  value: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.primary,

    textAlign: "right",
  },

  divider: {
    height: 1,

    backgroundColor: "#E8EEF5",

    marginVertical: 14,
  },

  typeBadge: {
    alignSelf: "flex-start",

    marginTop: 16,

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 20,

    backgroundColor: "#EAF3FF",
  },

  typeText: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 1,

    color: Colors.primary,
  },
});
