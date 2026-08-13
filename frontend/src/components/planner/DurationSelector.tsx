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

  const canDecrease = index > 0;
  const canIncrease = index < DURATIONS.length - 1;

  function decrease() {
    if (canDecrease) {
      onChange(DURATIONS[index - 1]);
    }
  }

  function increase() {
    if (canIncrease) {
      onChange(DURATIONS[index + 1]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Duration</Text>

      <View style={styles.card}>
        <Pressable
          onPress={decrease}
          disabled={!canDecrease}
          style={({ pressed }) => [
            styles.button,
            !canDecrease && styles.disabledButton,
            pressed && canDecrease && styles.pressed,
          ]}
        >
          <Minus
            size={21}
            color={canDecrease ? Colors.ink : Colors.handle}
            strokeWidth={2.4}
          />
        </Pressable>

        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>

          <Text style={styles.unit}>MIN</Text>
        </View>

        <Pressable
          onPress={increase}
          disabled={!canIncrease}
          style={({ pressed }) => [
            styles.button,
            !canIncrease && styles.disabledButton,
            pressed && canIncrease && styles.pressed,
          ]}
        >
          <Plus
            size={21}
            color={canIncrease ? Colors.ink : Colors.handle}
            strokeWidth={2.4}
          />
        </Pressable>
      </View>

      <View style={styles.range}>
        {DURATIONS.map((duration) => (
          <View
            key={duration}
            style={[
              styles.rangeDot,
              duration === value && styles.activeRangeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.subtitle,
    marginBottom: 8,
  },

  card: {
    height: 76,
    borderRadius: 23,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 12,

    shadowColor: Colors.ink,
    shadowOpacity: 0.045,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 2,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 17,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: Colors.ivory,
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.94 }],
  },

  valueContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    fontSize: 28,
    lineHeight: 31,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: Colors.ink,
  },

  unit: {
    marginTop: 1,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.water,
  },

  range: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 11,
  },

  rangeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.handle,
  },

  activeRangeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.water,
  },
});
