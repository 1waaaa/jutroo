import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  emoji: string;
  title: string;
  start: string;
  end: string;
  isLast?: boolean;
}

export default function ScheduleTimelineCard({
  emoji,
  title,
  start,
  end,
  isLast = false,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.time}>{start}</Text>

        <View style={styles.circle} />

        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.card}>
        <Text style={styles.emoji}>{emoji}</Text>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>
            {start} - {end}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    minHeight: 120,
  },

  left: {
    width: 70,

    alignItems: "center",
  },

  time: {
    fontSize: 15,

    fontWeight: "700",

    color: Colors.primary,

    marginBottom: 10,
  },

  circle: {
    width: 16,

    height: 16,

    borderRadius: 8,

    backgroundColor: Colors.primary,
  },

  line: {
    flex: 1,

    width: 2,

    marginTop: 6,

    backgroundColor: "#D8E8FA",
  },

  card: {
    flex: 1,

    marginBottom: 24,

    backgroundColor: "white",

    borderRadius: 22,

    padding: 18,

    flexDirection: "row",

    borderWidth: 1,

    borderColor: "#EEF2F7",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  emoji: {
    fontSize: 34,

    marginRight: 16,
  },

  content: {
    flex: 1,

    justifyContent: "center",
  },

  title: {
    fontSize: 20,

    fontWeight: "700",

    color: Colors.text,
  },

  subtitle: {
    marginTop: 6,

    color: Colors.subtitle,

    fontSize: 15,
  },
});
