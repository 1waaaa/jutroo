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
    marginBottom: 24,
  },

  label: {
    fontSize: 17,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: 10,
  },

  segment: {
    flexDirection: "row",

    backgroundColor: "#F1F5F9",

    borderRadius: 16,

    padding: 4,

    height: 52,
  },

  option: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    borderRadius: 13,
  },

  selectedOption: {
    backgroundColor: Colors.surface,

    shadowColor: "#000",

    shadowOpacity: 0.07,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,

      height: 2,
    },

    elevation: 2,
  },

  text: {
    fontSize: 15,

    fontWeight: "600",

    color: Colors.subtitle,
  },

  selectedText: {
    color: Colors.text,

    fontWeight: "700",
  },
});
