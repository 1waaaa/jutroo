import { StyleSheet, Text, View } from "react-native";

import { Sparkles } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  activityCount: number;
}

export default function ScheduleReadyCard({ activityCount }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.icon}>
          <Sparkles size={21} color={Colors.coral} strokeWidth={1.9} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>A plan made for you.</Text>

          <Text style={styles.subtitle}>
            Your activities are arranged into a smooth, efficient day.
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={styles.stat}>
          <Text style={styles.statText}>
            {activityCount} {activityCount === 1 ? "activity" : "activities"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 26,

    marginBottom: 26,

    paddingHorizontal: 18,

    paddingVertical: 18,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.58)",

    borderWidth: 1,

    borderColor: Colors.border,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  icon: {
    width: 46,

    height: 46,

    borderRadius: 15,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 13,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 17,

    fontWeight: "700",

    letterSpacing: -0.25,

    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,

    fontSize: 13,

    lineHeight: 18,

    color: Colors.subtitle,
  },

  divider: {
    height: 1,

    backgroundColor: Colors.border,

    marginVertical: 15,
  },

  bottomRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  stat: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  statText: {
    fontSize: 12,

    fontWeight: "600",

    color: Colors.subtitle,
  },

  optimized: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  dot: {
    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: Colors.success,
  },

  optimizedText: {
    fontSize: 12,

    fontWeight: "600",

    color: Colors.subtitle,
  },
});
