import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Check } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import AppTitle from "../../components/AppTitle/AppTitle";

import { Colors } from "../../theme/colors";

import { useOnboarding } from "../../context/OnboardingContext";
import { useUser } from "../../context/UserContext";

import { registerUser } from "../../api/auth";

import { completeOnboarding } from "../../services/storageService";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Loading">;

export default function LoadingScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { data, updateData } = useOnboarding();

  const { setUserId } = useUser();

  const [step, setStep] = useState(0);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function initializeApp() {
    try {
      setStep(1);
      await delay(500);

      setStep(2);
      await delay(500);

      if (data.latitude === null || data.longitude === null) {
        Alert.alert("Location missing", "Please enable location permission.");

        navigation.replace("Location");
        return;
      }

      setStep(3);

      const request = {
        username: data.username,
        height: data.height,
        weight: data.weight,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
      };

      const user = await registerUser(request);

      updateData({
        userId: user.id,
      });

      setUserId(user.id);

      setStep(4);

      await completeOnboarding();

      await AsyncStorage.setItem("userId", user.id.toString());

      await delay(700);

      navigation.replace("Home");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Registration failed",
        JSON.stringify(error.response?.data ?? error.message),
      );
    }
  }

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <AppTitle>Building your{"\n"}morning...</AppTitle>

        <View style={styles.list}>
          {step >= 1 && <LoadingItem text="Preparing weather services" />}

          {step >= 2 && <LoadingItem text="Calculating hydration goal" />}

          {step >= 3 && <LoadingItem text="Creating your account" />}

          {step >= 4 && <LoadingItem text="Personalizing your experience" />}
        </View>

        <Text style={styles.footer}>Almost there...</Text>
      </View>
    </ScreenContainer>
  );
}

function LoadingItem({ text }: { text: string }) {
  return (
    <View style={styles.item}>
      <Check size={20} color={Colors.primary} />

      <Text style={styles.itemText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  list: {
    marginTop: 40,

    gap: 18,

    width: "90%",
  },

  item: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  itemText: {
    fontSize: 17,

    color: Colors.text,
  },

  footer: {
    marginTop: 50,

    fontSize: 16,

    color: Colors.subtitle,
  },
});
