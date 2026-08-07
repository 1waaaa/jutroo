import { StyleSheet, Text, View } from "react-native";
import { Sparkles } from "lucide-react-native";

import { Colors } from "../../theme/colors";

export default function ScheduleReadyCard() {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Sparkles size={34} color="white" />
      </View>

      <Text style={styles.title}>Your schedule is ready!</Text>

      <Text style={styles.subtitle}>
        We've organized today's activities into the most efficient order based
        on your plan.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    borderRadius: 26,

    padding: 24,

    alignItems: "center",

    marginBottom: 28,

    borderWidth: 1,

    borderColor: "#EEF2F7",

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  icon: {
    width: 66,

    height: 66,

    borderRadius: 33,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 26,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,

    textAlign: "center",

    color: Colors.subtitle,

    fontSize: 16,

    lineHeight: 24,
  },
});
