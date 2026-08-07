import { View, Text, StyleSheet } from "react-native";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface Props {
  title: string;
  subtitle?: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function CTAActionCard({
  title,
  subtitle,
  buttonTitle,
  onPress,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>✨</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>
        {subtitle ??
          "Tell us what you need to accomplish today and we'll build the smartest schedule."}
      </Text>

      <PrimaryButton title={buttonTitle} onPress={onPress} disabled={false} />
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
