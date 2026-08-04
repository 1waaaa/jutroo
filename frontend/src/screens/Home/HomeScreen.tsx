import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";

import GreetingCard from "../../components/GreetingCard/GreetingCard";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import HydrationCard from "../../components/HydrationCard/HydrationCard";
import CTAActionCard from "../../components/CTAActionCard/CTAActionCard";

import { useOnboarding } from "../../context/OnboardingContext";
import { RootStackParamList } from "../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const { data } = useOnboarding();

  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollScreenContainer>
      <GreetingCard username={data.username} />

      <WeatherCard temperature={24} condition="Sunny" feelsLike={26} uv={7} />

      <HydrationCard waterGoal={2.3} />

      <CTAActionCard onPress={() => navigation.navigate("Activities")} />
    </ScrollScreenContainer>
  );
}
