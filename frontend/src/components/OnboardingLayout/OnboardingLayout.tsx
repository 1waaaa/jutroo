import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import ScreenContainer from "../ScreenContainer/ScreenContainer";

interface OnboardingLayoutProps {
  progress: ReactNode;
  children: ReactNode;
  button: ReactNode;
}

export default function OnboardingLayout({
  progress,
  children,
  button,
}: OnboardingLayoutProps) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.progress}>{progress}</View>

        <View style={styles.content}>{children}</View>

        <View style={styles.button}>{button}</View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  progress: {
    marginTop: 12,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
  },

  button: {
    paddingBottom: 24,
  },
});
