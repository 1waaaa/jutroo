import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Sun } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  text?: string;
}

export default function AppLoader({ text = "Loading..." }: Props) {
  return (
    <View style={styles.container}>
      <Sun size={56} color={Colors.accent} />

      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.spinner}
      />

      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.background,

    paddingHorizontal: 30,
  },

  spinner: {
    marginTop: 28,
  },

  text: {
    marginTop: 20,

    fontSize: 17,

    color: Colors.subtitle,

    fontWeight: "500",
  },
});
