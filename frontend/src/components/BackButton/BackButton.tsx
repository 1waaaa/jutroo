import { Pressable, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { Colors } from "../../theme/colors";

interface Props {
  onPress: () => void;
}

export default function BackButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <ChevronLeft size={28} color={Colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },
});
