import { View, Text, StyleSheet } from "react-native";
import { ReactNode } from "react";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface SuccessCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function SuccessCard({
  icon,
  title,
  subtitle,
  buttonTitle,
  onPress,
}: SuccessCardProps) {
  return (
    <View style={styles.container}>
      {icon}

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <PrimaryButton title={buttonTitle} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    borderRadius: 24,

    padding: 24,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 8,
  },

  title: {
    marginTop: 14,

    fontSize: 24,

    fontWeight: "700",

    color: "#1F2937",
  },

  subtitle: {
    marginTop: 8,

    textAlign: "center",

    color: "#6B7280",

    fontSize: 16,

    marginBottom: 10,
  },
});
