import { StyleSheet, Text, View } from "react-native";

import {
  BriefcaseBusiness,
  Coffee,
  Dumbbell,
  GraduationCap,
  Utensils,
  Clock3,
} from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  title: string;
  start: string;
  end: string;
  isLast?: boolean;
}

function getActivityIcon(title: string) {
  const normalized = title.toLowerCase();

  if (
    normalized.includes("university") ||
    normalized.includes("school") ||
    normalized.includes("study") ||
    normalized.includes("class") ||
    normalized.includes("lecture")
  ) {
    return GraduationCap;
  }

  if (
    normalized.includes("gym") ||
    normalized.includes("workout") ||
    normalized.includes("training") ||
    normalized.includes("exercise")
  ) {
    return Dumbbell;
  }

  if (
    normalized.includes("lunch") ||
    normalized.includes("dinner") ||
    normalized.includes("breakfast") ||
    normalized.includes("meal") ||
    normalized.includes("food")
  ) {
    return Utensils;
  }

  if (
    normalized.includes("cafe") ||
    normalized.includes("coffee") ||
    normalized.includes("tea")
  ) {
    return Coffee;
  }

  if (
    normalized.includes("work") ||
    normalized.includes("job") ||
    normalized.includes("office")
  ) {
    return BriefcaseBusiness;
  }

  return Clock3;
}

export default function ScheduleTimelineCard({
  title,
  start,
  end,
  isLast = false,
}: Props) {
  const Icon = getActivityIcon(title);

  return (
    <View style={styles.container}>
      <View style={styles.timeColumn}>
        <Text style={styles.startTime}>{start}</Text>

        <Text style={styles.endTime}>{end}</Text>
      </View>

      <View style={styles.timelineColumn}>
        <View style={styles.dot} />

        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.activity}>
        <View style={styles.iconContainer}>
          <Icon size={22} color="#FFFFFF" strokeWidth={1.8} />
        </View>

        <View style={styles.activityContent}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.duration}>
            {start} — {end}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    minHeight: 108,
  },

  timeColumn: {
    width: 64,

    paddingTop: 2,

    alignItems: "flex-start",
  },

  startTime: {
    fontSize: 16,

    fontWeight: "800",

    letterSpacing: -0.3,

    color: Colors.text,
  },

  endTime: {
    marginTop: 5,

    fontSize: 12,

    fontWeight: "500",

    color: Colors.subtitle,
  },

  timelineColumn: {
    width: 30,

    alignItems: "center",

    position: "relative",
  },

  dot: {
    width: 8,

    height: 8,

    marginTop: 7,

    borderRadius: 4,

    backgroundColor: Colors.handle,

    zIndex: 2,
  },

  line: {
    position: "absolute",

    top: 15,

    bottom: -4,

    width: 1,

    backgroundColor: Colors.handle,
  },

  activity: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    marginLeft: 10,

    marginBottom: 18,

    paddingVertical: 6,
  },

  iconContainer: {
    width: 50,

    height: 50,

    borderRadius: 17,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.ink,

    shadowColor: Colors.ink,

    shadowOpacity: 0.12,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,

      height: 5,
    },

    elevation: 3,
  },

  activityContent: {
    flex: 1,

    marginLeft: 15,
  },

  title: {
    fontSize: 19,

    fontWeight: "700",

    letterSpacing: -0.45,

    color: Colors.text,
  },

  duration: {
    marginTop: 5,

    fontSize: 13,

    fontWeight: "500",

    letterSpacing: 0.05,

    color: Colors.subtitle,
  },
});
