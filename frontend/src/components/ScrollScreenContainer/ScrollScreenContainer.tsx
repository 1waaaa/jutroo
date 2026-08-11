import { ScrollView, StyleSheet, View } from "react-native";

import { Colors } from "../../theme/colors";

interface Props {
  children: React.ReactNode;
}

export default function ScrollScreenContainer({ children }: Props) {
  return (
    <View style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "transparent",
  },

  content: {
    paddingHorizontal: 22,
    paddingBottom: 50,
  },
});
