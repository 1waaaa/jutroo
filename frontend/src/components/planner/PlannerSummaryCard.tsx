import { StyleSheet, Text, View } from "react-native";
import { CalendarDays, Check, Clock3 } from "lucide-react-native";

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
      ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
      : `${minutes} min`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>YOUR PLAN</Text>

          <Text style={styles.title}>Today's Summary</Text>
        </View>

        <View style={styles.readyBadge}>
          <Check size={12} color={Colors.ink} strokeWidth={2.8} />

          <Text style={styles.readyText}>READY</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.stats}>
        <View style={styles.stat}>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>ACTIVITIES</Text>
            <Text style={styles.statValue}>{activityCount}</Text>
          </View>
        </View>

        <View style={styles.stat}>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>PLANNED TIME</Text>
            <Text
              style={styles.statValue}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {duration}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    marginTop: 8,
    marginBottom: 26,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.ink,
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.subtitle,
    marginBottom: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
    color: Colors.ink,
  },

  readyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 999,

    backgroundColor: Colors.success,
  },

  readyText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: Colors.ink,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 18,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
  },

  stat: {
    flex: 1,
    minWidth: 0,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,
    paddingVertical: 16,

    borderRadius: 20,

    backgroundColor: Colors.ivory,
  },

  statContent: {
    flex: 1,
    minWidth: 0,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,

    color: Colors.subtitle,

    marginBottom: 5,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.6,

    color: Colors.ink,
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 9,
  },

  label: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: Colors.subtitle,
    marginBottom: 2,
  },

  value: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.ink,
    letterSpacing: -0.3,
  },
});
