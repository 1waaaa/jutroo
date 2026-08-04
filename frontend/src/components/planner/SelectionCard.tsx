import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../theme/colors";

interface Props {
  title: string;
  subtitle?: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
}

export default function SelectionCard({
  title,
  subtitle,
  emoji,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, selected && styles.selectedContainer]}
    >
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}

      <Text style={[styles.title, selected && styles.selectedText]}>
        {title}
      </Text>

      {subtitle && (
        <Text style={[styles.subtitle, selected && styles.selectedSubtitle]}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,

    height: 100,

    backgroundColor: Colors.surface,

    borderRadius: 22,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 12,

    marginBottom: 12,

    borderWidth: 2,

    borderColor: Colors.border,
  },

  selectedContainer: {
    backgroundColor: Colors.primary,

    borderColor: Colors.primary,
  },

  emoji: {
    fontSize: 28,

    marginBottom: 8,
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,

    color: Colors.subtitle,

    fontSize: 12,

    textAlign: "center",
  },

  selectedText: {
    color: Colors.surface,
  },

  selectedSubtitle: {
    color: Colors.surface,
  },
});
