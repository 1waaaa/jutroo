import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../../theme/colors";
import { ConfiguredActivity } from "../../../constants/activities";

interface Props {
  emoji: string;
  title: string;

  configuration?: ConfiguredActivity;

  onPress: () => void;
}

export default function ActivityCard({
  emoji,
  title,
  configuration,
  onPress,
}: Props) {
  function getSubtitle() {
    if (!configuration) {
      return "Not configured";
    }

    if (configuration.startTime && configuration.endTime) {
      return `${configuration.startTime} – ${configuration.endTime}`;
    }

    if (configuration.duration && configuration.preferredTime) {
      return `${configuration.duration} min • ${configuration.preferredTime}`;
    }

    return "Configured";
  }

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>

        <Text
          style={[styles.subtitle, configuration && styles.configuredSubtitle]}
        >
          {getSubtitle()}
        </Text>
      </View>

      {configuration && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✓</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    borderRadius: 22,

    padding: 18,

    marginBottom: 16,

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,
  },

  emoji: {
    fontSize: 30,

    marginRight: 18,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.text,
  },

  subtitle: {
    marginTop: 6,

    color: Colors.subtitle,

    fontSize: 14,
  },

  configuredSubtitle: {
    color: Colors.primary,

    fontWeight: "600",
  },

  badge: {
    width: 32,

    height: 32,

    borderRadius: 16,

    backgroundColor: Colors.success,

    justifyContent: "center",

    alignItems: "center",
  },

  badgeText: {
    color: Colors.surface,

    fontSize: 18,

    fontWeight: "700",
  },
});
