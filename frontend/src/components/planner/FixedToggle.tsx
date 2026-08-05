import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function FixedToggle({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Schedule Type</Text>

      <View style={styles.segment}>
        <Pressable
          style={[styles.option, !value && styles.selectedOption]}
          onPress={() => onChange(false)}
        >
          <Text style={[styles.text, !value && styles.selectedText]}>
            Flexible
          </Text>
        </Pressable>

        <Pressable
          style={[styles.option, value && styles.selectedOption]}
          onPress={() => onChange(true)}
        >
          <Text style={[styles.text, value && styles.selectedText]}>Fixed</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,

    marginBottom: 14,
  },

  segment: {
    flexDirection: "row",

    backgroundColor: Colors.surface,

    borderRadius: 16,

    borderWidth: 1,

    borderColor: Colors.border,

    padding: 4,
  },

  option: {
    flex: 1,

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: "center",
  },

  selectedOption: {
    backgroundColor: Colors.primary,
  },

  text: {
    color: Colors.subtitle,

    fontWeight: "600",

    fontSize: 15,
  },

  selectedText: {
    color: "white",
  },
});
