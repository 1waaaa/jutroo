import { Pressable, StyleSheet, Text, View } from "react-native";

import { ChevronDown } from "lucide-react-native";

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

      <Pressable style={styles.card} onPress={onPress}>
        <Text style={styles.time}>{value}</Text>

        <ChevronDown size={20} color={Colors.subtitle} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 18,

    paddingVertical: 18,

    borderRadius: 18,

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,
  },

  time: {
    fontSize: 24,

    fontWeight: "700",

    color: Colors.text,
  },
});
