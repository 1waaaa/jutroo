import { useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { UserRound, Droplets } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";
import { useOnboarding } from "../../context/OnboardingContext";

import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import AppInput from "../../components/AppInput/AppInput";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AboutYou">;

export default function AboutYouScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { updateData } = useOnboarding();

  const [username, setUsername] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  function handleFinish() {
    Keyboard.dismiss();

    if (
      username.trim() === "" ||
      height.trim() === "" ||
      weight.trim() === ""
    ) {
      Alert.alert("Missing Information", "Please complete all fields.");
      return;
    }

    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (Number.isNaN(heightNumber) || heightNumber < 80 || heightNumber > 250) {
      Alert.alert(
        "Invalid Height",
        "Please enter a height between 80 and 250 cm.",
      );
      return;
    }

    if (Number.isNaN(weightNumber) || weightNumber < 20 || weightNumber > 300) {
      Alert.alert(
        "Invalid Weight",
        "Please enter a weight between 20 and 300 kg.",
      );
      return;
    }

    updateData({
      username: username.trim(),
      height: heightNumber,
      weight: weightNumber,
    });

    navigation.replace("Loading");
  }

  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <ProgressBar step={5} total={5} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
        >
          <View style={styles.content}>
            <View style={styles.iconWrapper}>
              <UserRound size={38} color={Colors.coral} strokeWidth={1.7} />
            </View>

            <View style={styles.heading}>
              <AppTitle>
                Tell us{"\n"}
                about yourself.
              </AppTitle>

              <AppSubtitle>
                We'll personalize your hydration goal{"\n"}
                and build smarter daily plans.
              </AppSubtitle>
            </View>

            <View style={styles.form}>
              <AppInput
                placeholder="Choose a username"
                value={username}
                onChangeText={setUsername}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <AppInput
                placeholder="Height (cm)"
                value={height}
                onChangeText={setHeight}
                keyboardType="number-pad"
                returnKeyType="next"
              />

              <AppInput
                placeholder="Weight (kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={handleFinish}
              />
            </View>

            <View style={styles.info}>
              <View style={styles.infoIcon}>
                <Droplets size={22} color={Colors.water} strokeWidth={1.8} />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Personalized hydration</Text>

                <Text style={styles.infoSubtitle}>
                  Your daily water goal will be calculated from your height and
                  weight.
                </Text>
              </View>
            </View>

            <View style={styles.bottom}>
              <PrimaryButton
                title="Finish Setup"
                onPress={handleFinish}
                disabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 30,
    paddingBottom: 40,
  },

  content: {
    width: "100%",
    alignItems: "center",
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  heading: {
    width: "100%",
    alignItems: "center",

    marginBottom: 28,
  },

  form: {
    width: "100%",
    gap: 12,

    marginBottom: 20,
  },

  info: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 14,

    borderRadius: 20,

    backgroundColor: Colors.waterLight,

    borderWidth: 1,
    borderColor: "rgba(124,184,232,0.18)",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.65)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  infoText: {
    flex: 1,
    paddingRight: 4,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "700",

    color: Colors.text,

    marginBottom: 3,
  },

  infoSubtitle: {
    fontSize: 13,
    lineHeight: 18,

    color: Colors.subtitle,
  },

  bottom: {
    width: "100%",

    marginTop: 20,
  },
});
