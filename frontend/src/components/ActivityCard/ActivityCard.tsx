import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  emoji: string;

  title: string;

  description: string;

  selected: boolean;

  onPress: () => void;
}

export default function ActivityCard({
  emoji,

  title,

  description,

  selected,

  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      <Text style={styles.emoji}>{emoji}</Text>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{description}</Text>
      </View>

      {selected && <Text style={styles.check}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 18,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 14,

    borderWidth: 2,

    borderColor: "transparent",
  },

  selected: {
    borderColor: Colors.primary,

    backgroundColor: "#F5FAFF",
  },

  emoji: {
    fontSize: 30,

    marginRight: 18,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: "#1F2937",
  },

  subtitle: {
    color: "#6B7280",

    marginTop: 4,
  },

  check: {
    fontSize: 24,

    color: Colors.primary,

    fontWeight: "700",
  },
});
