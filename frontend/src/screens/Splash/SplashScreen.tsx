import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome" as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>☀️</Text>

      <Text style={styles.title}>Jutro</Text>

      <Text style={styles.subtitle}>Plan your day around the weather.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFBF8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 70,
    marginBottom: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#243447",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 18,
    color: "#6E7C8A",
    textAlign: "center",
  },
});
