import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Sun, Check } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../navigation/types";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import AppTitle from "../../components/AppTitle/AppTitle";
import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Loading">;

export default function LoadingScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),

      setTimeout(() => setStep(2), 900),

      setTimeout(() => setStep(3), 1400),

      setTimeout(() => setStep(4), 1900),

      setTimeout(() => {
        navigation.replace("Home");
      }, 2700),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Sun size={80} color={Colors.accent} />

        <AppTitle>
          Building your{"\n"}
          morning...
        </AppTitle>

        <View style={styles.list}>
          {step >= 1 && <LoadingItem text="Weather forecast ready" />}

          {step >= 2 && <LoadingItem text="Hydration goal calculated" />}

          {step >= 3 && <LoadingItem text="Planner initialized" />}

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
      <Check size={20} color="#32C671" />

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

    color: "#374151",
  },

  footer: {
    marginTop: 50,

    fontSize: 16,

    color: "#94A3B8",
  },
});
