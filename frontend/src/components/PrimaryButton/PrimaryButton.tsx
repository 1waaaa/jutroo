import { Pressable, Text, StyleSheet } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    borderRadius: 18,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#5DADE2",

    shadowOpacity: 0.22,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    color: "#FFF",

    fontSize: 17,

    fontWeight: "700",
  },
});
