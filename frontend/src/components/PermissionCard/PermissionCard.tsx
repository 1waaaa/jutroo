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
        <View style={styles.iconWrapper}>{icon}</View>

        <View style={styles.spacing} />

        <AppTitle>{title}</AppTitle>

        <AppSubtitle>{subtitle}</AppSubtitle>
      </View>

      <View style={styles.bottom}>
        <PrimaryButton title={buttonTitle} onPress={onPress} disabled={false} />

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

    width: "100%",
  },

  iconWrapper: {
    width: 112,

    height: 112,

    borderRadius: 56,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 4,
  },

  spacing: {
    height: 24,
  },

  bottom: {
    width: "100%",
  },

  footer: {
    marginTop: 16,

    textAlign: "center",

    color: Colors.subtitle,

    fontSize: 13,

    lineHeight: 19,

    paddingHorizontal: 20,
  },
});
