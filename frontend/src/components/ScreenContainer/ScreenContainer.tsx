import { SafeAreaView, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function ScreenContainer({ children }: Props) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "transparent",
  },
});
