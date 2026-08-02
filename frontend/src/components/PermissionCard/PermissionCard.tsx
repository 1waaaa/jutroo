import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

import AppTitle from "../AppTitle/AppTitle";
import AppSubtitle from "../AppSubtitle/AppSubtitle";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

import { Colors } from "../../theme/colors";

interface PermissionCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  buttonTitle: string;
  footer: string;
  onPress: () => void;
}

export default function PermissionCard({
  icon,
  title,
  subtitle,
  buttonTitle,
  footer,
  onPress,
}: PermissionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {icon}

        <View style={styles.spacing} />

        <AppTitle>{title}</AppTitle>

        <AppSubtitle>{subtitle}</AppSubtitle>
      </View>

      <View>
        <PrimaryButton title={buttonTitle} onPress={onPress} />

        <Text style={styles.footer}>{footer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",

    paddingVertical: 40,
  },

  content: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  spacing: {
    height: 30,
  },

  footer: {
    marginTop: 18,

    textAlign: "center",

    color: Colors.subtitle,

    fontSize: 13,
  },
});
