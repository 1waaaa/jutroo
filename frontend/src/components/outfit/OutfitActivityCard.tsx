import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  emoji: string;
  title: string;
  selected: boolean;
  onPress: () => void;
}

export default function OutfitActivityCard({
  emoji,
  title,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.selectedCard]}
    >
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={[styles.title, selected && styles.selectedTitle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",

    backgroundColor: Colors.surface,

    borderRadius: 22,

    paddingVertical: 24,

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,

    marginBottom: 12,
  },

  selectedCard: {
    backgroundColor: Colors.primary,

    borderColor: Colors.primary,
  },

  emoji: {
    fontSize: 38,

    marginBottom: 10,
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    color: Colors.text,
  },

  selectedTitle: {
    color: "white",
  },
});
