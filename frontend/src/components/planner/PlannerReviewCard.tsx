import { StyleSheet, Text, View } from "react-native";
import { Clock3, Lock, Sparkles } from "lucide-react-native";

import { Activity, ConfiguredActivity } from "../../constants/activities";
import { ACTIVITY_ICONS } from "../../constants/activityIcons";
import { Colors } from "../../theme/colors";

interface Props {
  activity: Activity;
  configuration: ConfiguredActivity;
}

export default function PlannerReviewCard({ activity, configuration }: Props) {
  const Icon = ACTIVITY_ICONS[activity.id] ?? Sparkles;

  const hours = Math.floor(configuration.duration / 60);
  const minutes = configuration.duration % 60;

  const duration =
    hours > 0
      ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
      : `${minutes} min`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.activityIcon}>
          <Icon size={23} color={Colors.ink} strokeWidth={2} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activity.title}</Text>

          <Text style={styles.duration}>{duration}</Text>
        </View>

        <View
          style={[
            styles.status,
            configuration.fixed ? styles.fixedStatus : styles.flexibleStatus,
          ]}
        >
          {configuration.fixed ? (
            <Lock size={12} color={Colors.ink} strokeWidth={2.4} />
          ) : (
            <Sparkles size={12} color={Colors.ink} strokeWidth={2.2} />
          )}

          <Text style={styles.statusText}>
            {configuration.fixed ? "FIXED" : "FLEXIBLE"}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.timeSection}>
        <View style={styles.timeContent}>
          <Text style={styles.timeLabel}>
            {configuration.fixed ? "SCHEDULED TIME" : "TIME WINDOW"}
          </Text>

          <Text style={styles.time} numberOfLines={1} adjustsFontSizeToFit>
            {configuration.fixed
              ? `${configuration.earliest}  →  ${configuration.latest}`
              : `${configuration.earliest}  —  ${configuration.latest}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.ink,
    shadowOpacity: 0.045,
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
  },

  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.mist,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  titleContainer: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
    color: Colors.ink,
  },

  duration: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.subtitle,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 8,
  },

  fixedStatus: {
    backgroundColor: Colors.waterLight,
  },

  flexibleStatus: {
    backgroundColor: Colors.mist,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: Colors.ink,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },

  timeSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.waterLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  timeContent: {
    flex: 1,
    minWidth: 0,
  },

  timeLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: Colors.subtitle,
    marginBottom: 3,
  },

  time: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.2,
    color: Colors.ink,
  },
});
