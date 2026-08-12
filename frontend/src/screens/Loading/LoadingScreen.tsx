import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Easing, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Check, Sun } from "lucide-react-native";

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

  const pulse = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0.35)).current;
  const spin = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulse, {
            toValue: 1.045,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(glow, {
            toValue: 0.6,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(glow, {
            toValue: 0.35,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  useEffect(() => {
    const rotation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    rotation.start();

    return () => {
      rotation.stop();
    };
  }, []);

  const rotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function getFooterText() {
    if (step <= 1) {
      return "Getting things ready...";
    }

    if (step === 2) {
      return "Making it personal...";
    }

    if (step === 3) {
      return "Creating your Jutro...";
    }

    if (step >= 4) {
      return "Almost there...";
    }

    return "Getting things ready...";
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Animated.View
            style={[
              styles.glow,
              {
                opacity: glow,
                transform: [{ scale: pulse }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.logoCircle,
              {
                transform: [
                  {
                    scale: pulse,
                  },
                ],
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [{ rotate: rotation }],
              }}
            >
              <Sun size={48} color={Colors.coral} strokeWidth={1.5} />
            </Animated.View>
          </Animated.View>
        </View>

        <View style={styles.heading}>
          <AppTitle>
            Building your{"\n"}
            morning...
          </AppTitle>

          <Text style={styles.subtitle}>
            We're getting everything ready
            {"\n"}
            for your personalized day.
          </Text>
        </View>

        <View style={styles.list}>
          <LoadingItem
            text="Preparing weather services"
            completed={step > 1}
            active={step === 1}
          />

          <LoadingItem
            text="Calculating hydration goal"
            completed={step > 2}
            active={step === 2}
          />

          <LoadingItem
            text="Creating your account"
            completed={step > 3}
            active={step === 3}
          />

          <LoadingItem
            text="Personalizing your experience"
            completed={step >= 4}
            active={step === 4}
          />
        </View>

        <Text style={styles.footer}>{getFooterText()}</Text>
      </View>
    </ScreenContainer>
  );
}

interface LoadingItemProps {
  text: string;
  completed: boolean;
  active: boolean;
}

function LoadingItem({ text, completed, active }: LoadingItemProps) {
  return (
    <View style={[styles.item, !active && !completed && styles.inactiveItem]}>
      <View
        style={[
          styles.status,
          completed && styles.completedStatus,
          active && styles.activeStatus,
        ]}
      >
        {completed ? (
          <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
        ) : active ? (
          <View style={styles.activeDot} />
        ) : null}
      </View>

      <Text
        style={[
          styles.itemText,
          active && styles.activeText,
          completed && styles.completedText,
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

    paddingHorizontal: 8,
  },

  hero: {
    width: 120,

    height: 120,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 28,
  },

  glow: {
    position: "absolute",

    width: 118,

    height: 118,

    borderRadius: 59,

    backgroundColor: Colors.softCoral,
  },

  logoCircle: {
    width: 88,

    height: 88,

    borderRadius: 44,

    backgroundColor: Colors.ivory,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(217,130,114,0.18)",

    shadowColor: Colors.coral,

    shadowOpacity: 0.12,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 3,
  },

  heading: {
    alignItems: "center",

    width: "100%",

    marginBottom: 36,
  },

  subtitle: {
    marginTop: 12,

    textAlign: "center",

    fontSize: 14,

    lineHeight: 21,

    color: Colors.subtitle,
  },

  list: {
    width: "100%",

    maxWidth: 340,

    gap: 16,
  },

  item: {
    flexDirection: "row",

    alignItems: "center",

    minHeight: 28,
  },

  inactiveItem: {
    opacity: 0.35,
  },

  status: {
    width: 28,

    height: 28,

    borderRadius: 14,

    borderWidth: 1,

    borderColor: Colors.border,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 13,
  },

  activeStatus: {
    borderColor: Colors.coral,

    backgroundColor: Colors.softCoral,
  },

  completedStatus: {
    borderColor: Colors.coral,

    backgroundColor: Colors.coral,
  },

  activeDot: {
    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor: Colors.coral,
  },

  itemText: {
    flex: 1,

    fontSize: 15,

    fontWeight: "500",

    color: Colors.subtitle,
  },

  activeText: {
    color: Colors.text,

    fontWeight: "600",
  },

  completedText: {
    color: Colors.text,
  },

  footer: {
    marginTop: 34,

    fontSize: 13,

    fontWeight: "600",

    color: Colors.coral,
  },
});
