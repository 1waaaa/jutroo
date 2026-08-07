import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Check, Sparkles } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import AppTitle from "../../components/AppTitle/AppTitle";

import { RootStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";

import { usePlanner } from "../../context/PlannerContext";
import { mockSchedule } from "../../mock/schedule";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GeneratingPlan"
>;

export default function GeneratingPlanScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { setSchedule } = usePlanner();

  const [step, setStep] = useState(0);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function generate() {
      setStep(1);
      await delay(700);

      setStep(2);
      await delay(700);

      setStep(3);
      await delay(700);

      setStep(4);
      await delay(900);

      // Kasnije:
      // const plan = await getPlan(userId);
      // setSchedule(plan.items);

      setSchedule(mockSchedule);

      navigation.replace("GeneratedSchedule");
    }

    generate();
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Sparkles size={70} color={Colors.primary} />

        <AppTitle>Building your{"\n"}perfect day...</AppTitle>

        <View style={styles.list}>
          {step >= 1 && <LoadingItem text="Analyzing today's weather" />}

          {step >= 2 && <LoadingItem text="Calculating hydration" />}

          {step >= 3 && <LoadingItem text="Optimizing your activities" />}

          {step >= 4 && <LoadingItem text="Creating your schedule" />}
        </View>

        <Text style={styles.footer}>Almost ready...</Text>
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
    marginTop: 45,

    color: Colors.subtitle,

    fontSize: 16,
  },
});
