import { View, Text, StyleSheet } from "react-native";

interface GreetingCardProps {
  username: string;
}

export default function GreetingCard({ username }: GreetingCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>☀ Good Morning,</Text>

      <Text style={styles.name}>{username}</Text>

      <Text style={styles.subtitle}>Own your morning.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  greeting: {
    fontSize: 18,
    color: "#64748B",
  },

  name: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1F2937",
    marginTop: 4,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#94A3B8",
  },
});
