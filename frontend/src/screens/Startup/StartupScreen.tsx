import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import {
  hasCompletedOnboarding,
  resetOnboarding,
} from "../../services/storageService";

import { useUser } from "../../context/UserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Startup">;

const DEV_RESET = false;

export default function StartupScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { setUserId } = useUser();

  useEffect(() => {
    async function check() {
      if (DEV_RESET) {
        await resetOnboarding();
      }

      const completed = await hasCompletedOnboarding();
      if (!completed) {
        navigation.replace("Splash");
        return;
      }

      const storedId = await AsyncStorage.getItem("userId");

      if (storedId) {
        setUserId(Number(storedId));
      }

      navigation.replace("Home");
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
