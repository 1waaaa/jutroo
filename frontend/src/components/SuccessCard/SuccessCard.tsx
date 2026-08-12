import { View, Text, StyleSheet } from "react-native";

import type { ReactNode } from "react";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

import { Colors } from "../../theme/colors";

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
      <View style={styles.iconWrapper}>{icon}</View>

      <Text style={styles.eyebrow}>ALL SET</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.button}>
        <PrimaryButton title={buttonTitle} onPress={onPress} disabled={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: "rgba(255,255,255,0.72)",

    borderRadius: 28,

    paddingHorizontal: 24,

    marginTop: 10,

    paddingTop: 28,

    paddingBottom: 24,

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(217,130,114,0.14)",

    shadowColor: Colors.ink,

    shadowOpacity: 0.06,

    shadowRadius: 24,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 4,
  },

  iconWrapper: {
    width: 72,

    height: 72,

    borderRadius: 36,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 18,
  },

  eyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    color: Colors.coral,

    marginBottom: 7,
  },

  title: {
    fontSize: 28,

    fontWeight: "800",

    letterSpacing: -0.5,

    color: Colors.ink,
  },

  subtitle: {
    marginTop: 8,

    marginBottom: 22,

    maxWidth: 280,

    textAlign: "center",

    color: Colors.subtitle,

    fontSize: 15,

    lineHeight: 22,
  },

  button: {
    width: "100%",
  },
});
