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

      setSchedule(mockSchedule);

      navigation.replace("GeneratedSchedule");
    }

    generate();
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.sparkleOuter}>
            <View style={styles.sparkleInner}>
              <Sparkles size={30} color={Colors.coral} strokeWidth={1.7} />
            </View>
          </View>

          <Text style={styles.eyebrow}>JUTRO AI</Text>

          <AppTitle>
            Building your{"\n"}
            perfect day...
          </AppTitle>

          <Text style={styles.subtitle}>
            Bringing everything together for a smoother day ahead.
          </Text>
        </View>

        <View style={styles.list}>
          <LoadingItem
            text="Analyzing today's weather"
            active={step === 1}
            completed={step > 1}
            visible={step >= 1}
          />

          <LoadingItem
            text="Calculating hydration"
            active={step === 2}
            completed={step > 2}
            visible={step >= 2}
          />

          <LoadingItem
            text="Optimizing your activities"
            active={step === 3}
            completed={step > 3}
            visible={step >= 3}
          />

          <LoadingItem
            text="Creating your schedule"
            active={step === 4}
            completed={false}
            visible={step >= 4}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerDot} />

          <Text style={styles.footerText}>Almost ready</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

interface LoadingItemProps {
  text: string;
  active: boolean;
  completed: boolean;
  visible: boolean;
}

function LoadingItem({ text, active, completed, visible }: LoadingItemProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.item}>
      <View
        style={[
          styles.status,
          completed && styles.statusCompleted,
          active && styles.statusActive,
        ]}
      >
        {completed ? (
          <Check size={13} color={Colors.text} strokeWidth={2.5} />
        ) : (
          <View style={[styles.activeDot, active && styles.activeDotVisible]} />
        )}
      </View>

      <Text
        style={[
          styles.itemText,
          completed && styles.completedText,
          active && styles.activeText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 24,
  },

  hero: {
    alignItems: "center",

    width: "100%",
  },

  sparkleOuter: {
    width: 88,

    height: 88,

    borderRadius: 44,

    backgroundColor: "rgba(232,196,119,0.12)",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 22,
  },

  sparkleInner: {
    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(217,130,114,0.16)",
  },

  eyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 3,

    color: Colors.subtitle,

    marginBottom: 9,
  },

  subtitle: {
    maxWidth: 290,

    marginTop: 13,

    textAlign: "center",

    fontSize: 14,

    lineHeight: 21,

    color: Colors.subtitle,
  },

  list: {
    width: "100%",

    maxWidth: 330,

    marginTop: 42,

    gap: 14,
  },

  item: {
    minHeight: 42,

    flexDirection: "row",

    alignItems: "center",
  },

  status: {
    width: 32,

    height: 32,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.mist,

    marginRight: 13,
  },

  statusActive: {
    backgroundColor: Colors.softCoral,
  },

  statusCompleted: {
    backgroundColor: Colors.success,
  },

  activeDot: {
    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: Colors.handle,
  },

  activeDotVisible: {
    width: 8,

    height: 8,

    borderRadius: 4,

    backgroundColor: Colors.coral,
  },

  itemText: {
    flex: 1,

    fontSize: 15,

    fontWeight: "600",

    color: Colors.subtitle,

    letterSpacing: -0.1,
  },

  activeText: {
    color: Colors.text,

    fontWeight: "700",
  },

  completedText: {
    color: Colors.text,

    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 42,

    gap: 7,
  },

  footerDot: {
    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: Colors.success,
  },

  footerText: {
    fontSize: 13,

    fontWeight: "600",

    color: Colors.subtitle,
  },
});
