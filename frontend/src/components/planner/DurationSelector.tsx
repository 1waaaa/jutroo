import { Pressable, StyleSheet, Text, View } from "react-native";

import { Minus, Plus } from "lucide-react-native";

import { Colors } from "../../theme/colors";
import { DURATIONS } from "../../constants/activities";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function DurationSelector({ value, onChange }: Props) {
  const index = DURATIONS.indexOf(value);

  function increase() {
    if (index < DURATIONS.length - 1) {
      onChange(DURATIONS[index + 1]);
    }
  }

  function decrease() {
    if (index > 0) {
      onChange(DURATIONS[index - 1]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Duration</Text>

      <View style={styles.card}>
        <Pressable
          style={styles.button}
          onPress={decrease}
          disabled={index === 0}
        >
          <Minus size={24} color={index === 0 ? "#CBD5E1" : Colors.primary} />
        </Pressable>

        <Text style={styles.value}>{value} min</Text>

        <Pressable
          style={styles.button}
          onPress={increase}
          disabled={index === DURATIONS.length - 1}
        >
          <Plus
            size={24}
            color={index === DURATIONS.length - 1 ? "#CBD5E1" : Colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },

  card: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    backgroundColor: Colors.surface,

    borderRadius: 22,

    borderWidth: 1,

    borderColor: Colors.border,

    paddingHorizontal: 14,

    height: 72,
  },

  button: {
    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: "#F4F7FA",

    justifyContent: "center",

    alignItems: "center",
  },

  value: {
    fontSize: 24,

    fontWeight: "700",

    color: Colors.primary,
  },
});
