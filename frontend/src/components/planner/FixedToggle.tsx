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
          style={({ pressed }) => [
            styles.option,
            !value && styles.selectedOption,
            pressed && styles.pressed,
          ]}
          onPress={() => onChange(false)}
        >
          <Text style={[styles.text, !value && styles.selectedText]}>
            Flexible
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.option,
            value && styles.selectedOption,
            pressed && styles.pressed,
          ]}
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
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.subtitle,
    marginBottom: 8,
  },

  segment: {
    height: 58,
    flexDirection: "row",
    backgroundColor: Colors.mist,
    borderRadius: 19,
    padding: 4,
  },

  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  selectedOption: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.subtitle,
  },

  selectedText: {
    color: Colors.ink,
    fontWeight: "700",
  },
});
