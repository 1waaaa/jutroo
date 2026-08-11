import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function ScrollScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "transparent",
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },
});
