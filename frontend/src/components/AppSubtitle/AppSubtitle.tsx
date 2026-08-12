import { Text, StyleSheet } from "react-native";

import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";

interface Props {
  children: React.ReactNode;
}

export default function AppSubtitle({ children }: Props) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    width: "100%",
    maxWidth: 320,

    fontSize: Typography.body,

    color: Colors.subtitle,

    textAlign: "center",

    marginTop: 12,

    lineHeight: 24,

    paddingHorizontal: 10,
  },
});
