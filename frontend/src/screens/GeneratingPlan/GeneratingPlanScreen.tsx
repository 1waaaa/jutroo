import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Check } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import AppTitle from "../../components/AppTitle/AppTitle";

import { RootStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GeneratingPlan"
>;

export default function GeneratingPlanScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [step, setStep] = useState(0);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      setStep(1);
      await delay(1500);

      if (cancelled) return;

      setStep(2);
      await delay(1500);

      if (cancelled) return;

      setStep(3);
      await delay(1500);

      if (cancelled) return;

      setStep(4);
      await delay(1000);

      if (cancelled) return;

      /*
       * Plan je VEĆ generisan u ReviewPlanScreen-u
       * i sačuvan u PlannerContext-u.
       *
       * Ovde samo završavamo loading animaciju
       * i prelazimo na ekran sa pravim planom.
       *
       * NE stavljamo mockSchedule ovde,
       * jer bi pregazio rezultat backend-a.
       */
      navigation.replace("GeneratedSchedule");
    }

    generate();

    return () => {
      cancelled = true;
    };
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo/jutro-mark-dark.png")}
              style={styles.logoMark}
              resizeMode="contain"
            />
          </View>

          <AppTitle>
            Building your{"\n"}
            perfect day...
          </AppTitle>
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

  logoContainer: {
    width: 104,

    height: 104,

    borderRadius: 52,

    marginBottom: 10,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,

    elevation: 5,
  },

  logoMark: {
    width: 50,

    height: 68,
  },

  brand: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 4,

    color: Colors.subtitle,

    marginBottom: 10,
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
