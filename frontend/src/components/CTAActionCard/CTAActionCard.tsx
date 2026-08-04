import { View, Text, StyleSheet } from "react-native";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface Props {
  onPress: () => void;
}

export default function CTAActionCard({ onPress }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>✨</Text>

      <Text style={styles.title}>Ready to plan{"\n"}your day?</Text>

      <Text style={styles.subtitle}>
        Tell us what you need to accomplish today and we'll build the smartest
        schedule.
      </Text>

      <PrimaryButton title="Start My Morning" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  emoji: {
    fontSize: 38,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginVertical: 18,
    lineHeight: 22,
  },
});
