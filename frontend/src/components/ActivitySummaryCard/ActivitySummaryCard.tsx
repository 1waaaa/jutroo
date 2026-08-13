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
        <View style={styles.iconContainer}>
          <Clock3 size={18} color={Colors.ink} strokeWidth={1.9} />
        </View>

        <Text style={styles.title}>Activity Summary</Text>
      </View>

      <View style={styles.rows}>
        {fixed ? (
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>

            <Text style={styles.value}>
              {start} → {end}
            </Text>
          </View>
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
      </View>

      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>
          {fixed ? "FIXED TIME" : "FLEXIBLE TIME"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.ivory,
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.ink,
    letterSpacing: -0.2,
  },

  rows: {
    backgroundColor: Colors.surface,
    borderRadius: 17,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },

  row: {
    minHeight: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.subtitle,
    flex: 1,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.ink,
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  typeBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.mist,
  },

  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
    marginRight: 7,
  },

  typeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: Colors.subtitle,
  },
});
