import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronDown, Clock3 } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  label: string;
  value: string;
  onPress: () => void;
}

export default function TimeSelector({ label, value, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Clock3 size={20} color={Colors.ink} strokeWidth={1.9} />
          </View>

          <Text style={styles.time}>{value}</Text>
        </View>

        <View style={styles.arrow}>
          <ChevronDown size={18} color={Colors.subtitle} strokeWidth={2} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.subtitle,
    marginBottom: 8,
  },

  card: {
    height: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  pressed: {
    backgroundColor: Colors.mist,
    transform: [{ scale: 0.99 }],
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.mist,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  time: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.6,
    color: Colors.ink,
  },

  arrow: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: Colors.ivory,
    justifyContent: "center",
    alignItems: "center",
  },
});
