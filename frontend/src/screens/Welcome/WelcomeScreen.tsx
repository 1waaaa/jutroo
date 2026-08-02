import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Sun } from "lucide-react-native";

import { RootStackParamList } from "../../navigation/types";

import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import OnboardingLayout from "../../components/OnboardingLayout/OnboardingLayout";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import { Colors } from "../../theme/colors";

type WelcomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavigationProp>();

  return (
    <OnboardingLayout
      progress={<ProgressBar step={1} total={5} />}
      button={
        <PrimaryButton
          title="Let's Begin"
          onPress={() => navigation.navigate("Location")}
        />
      }
    >
      <Sun size={90} color={Colors.accent} strokeWidth={2} />

      <AppTitle>
        Good morning.{"\n"}
        Let's build your{"\n"}
        perfect day.
      </AppTitle>

      <AppSubtitle>
        Build your day around the weather, stay hydrated and receive smart
        recommendations.
      </AppSubtitle>
    </OnboardingLayout>
  );
}
