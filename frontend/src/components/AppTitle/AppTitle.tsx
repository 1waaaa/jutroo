import { Text, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";

interface Props {
  children: React.ReactNode;
}

export default function AppTitle({ children }: Props) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.h1,
    color: Colors.text,
    fontWeight: "800",
    textAlign: "center",
  },
});
