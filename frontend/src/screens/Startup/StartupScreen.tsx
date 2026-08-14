import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import { useUser } from "../../context/UserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Startup">;

export default function StartupScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { setUserId } = useUser();

  useEffect(() => {
    async function check() {
      // OBRIŠI CEO ASYNC STORAGE
      // await AsyncStorage.clear();

      navigation.replace("Splash");
    }

    check();
  }, [navigation]);

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
