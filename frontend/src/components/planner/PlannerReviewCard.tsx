import { StyleSheet, Text, View } from "react-native";
import { Clock3, Lock, Sparkles } from "lucide-react-native";

import { Activity, ConfiguredActivity } from "../../constants/activities";
import { Colors } from "../../theme/colors";

interface Props {
  activity: Activity;
  configuration: ConfiguredActivity;
}

export default function PlannerReviewCard({ activity, configuration }: Props) {
  const hours = Math.floor(configuration.duration / 60);
  const minutes = configuration.duration % 60;

  const duration =
    hours > 0
      ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
      : `${minutes} min`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{activity.emoji}</Text>

        <Text style={styles.title}>{activity.title}</Text>
      </View>

      <View style={styles.info}>
        {configuration.fixed ? (
          <>
            <View style={styles.row}>
              <Lock size={18} color={Colors.primary} />

              <Text style={styles.value}>Fixed schedule</Text>
            </View>

            <Text style={styles.time}>
              {configuration.earliest} → {configuration.latest}
            </Text>
          </>
        ) : (
          <View style={styles.row}>
            <Sparkles size={18} color={Colors.primary} />

            <Text style={styles.value}>Flexible</Text>
          </View>
        )}

        <View style={styles.row}>
          <Clock3 size={18} color={Colors.primary} />

          <Text style={styles.value}>{duration}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    borderRadius: 22,

    padding: 20,

    marginBottom: 18,

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

  header: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 18,
  },

  emoji: {
    fontSize: 32,

    marginRight: 14,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,
  },

  info: {
    gap: 12,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,
  },

  value: {
    fontSize: 16,

    color: Colors.text,

    fontWeight: "600",
  },

  time: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.primary,

    marginLeft: 28,
  },
});
