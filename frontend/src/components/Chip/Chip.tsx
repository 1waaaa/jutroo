import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 12,

    paddingHorizontal: 20,

    borderRadius: 20,

    backgroundColor: "#EEF2F7",

    marginRight: 10,

    marginBottom: 10,
  },

  selected: {
    backgroundColor: Colors.primary,
  },

  text: {
    fontWeight: "600",

    color: "#334155",
  },

  selectedText: {
    color: "white",
  },
});
