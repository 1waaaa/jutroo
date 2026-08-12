import { Pressable, Text, StyleSheet } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

export default function PrimaryButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    borderRadius: 18,

    backgroundColor: Colors.coral,

    marginHorizontal: 10,

    justifyContent: "center",

    alignItems: "center",

    shadowColor: Colors.coral,

    shadowOpacity: 0.2,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  pressed: {
    opacity: 0.82,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  disabled: {
    opacity: 0.45,
  },

  text: {
    color: Colors.ivory,

    fontSize: 17,

    fontWeight: "700",
  },
});
