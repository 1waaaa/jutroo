import { useState } from "react";
import { View, StyleSheet, Alert, Keyboard } from "react-native";

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

    if (isNaN(heightNumber) || heightNumber < 80 || heightNumber > 250) {
      Alert.alert("Invalid Height", "Please enter a valid height.");
      return;
    }

    if (isNaN(weightNumber) || weightNumber < 20 || weightNumber > 300) {
      Alert.alert("Invalid Weight", "Please enter a valid weight.");
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
      <ProgressBar step={5} total={5} />

      <View style={styles.content}>
        <UserRound size={70} color={Colors.primary} />

        <AppTitle>
          Tell us{"\n"}
          about yourself.
        </AppTitle>

        <AppSubtitle>
          We'll personalize your hydration goal{"\n"}
          and build smarter daily plans.
        </AppSubtitle>

        <AppInput
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
        />

        <AppInput
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          returnKeyType="next"
        />

        <AppInput
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <View style={styles.infoCard}>
          <Droplets size={34} color="#38BDF8" />

          <AppSubtitle>
            Your hydration goal will be{"\n"}
            calculated using your{"\n"}
            height and weight.
          </AppSubtitle>
        </View>
      </View>

      <PrimaryButton
        title="✨ Finish Setup"
        onPress={handleFinish}
        disabled={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
  },

  infoCard: {
    backgroundColor: "#F4FBFD",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
});
