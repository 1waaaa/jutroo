import { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

import { hasCompletedOnboarding } from "../../services/storageService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Startup">;

export default function StartupScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    async function check() {
      const completed = await hasCompletedOnboarding();

      if (completed) {
        navigation.replace("Home");
      } else {
        navigation.replace("Splash");
      }
    }

    check();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#F8FBFF",
  },
});
