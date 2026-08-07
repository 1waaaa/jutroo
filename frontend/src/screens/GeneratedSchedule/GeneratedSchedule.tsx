import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import ScheduleReadyCard from "../../components/schedule/ScheduleReadyCard";
import ScheduleTimelineCard from "../../components/schedule/ScheduleTimelineCard";

import { RootStackParamList } from "../../navigation/types";

import { usePlanner } from "../../context/PlannerContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GeneratedSchedule"
>;

export default function GeneratedScheduleScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { schedule } = usePlanner();

  return (
    <ScrollScreenContainer>
      <BackButton onPress={() => navigation.goBack()} />

      <AppTitle>Your Day{"\n"}is Ready</AppTitle>

      <AppSubtitle>Here's the optimized schedule for today.</AppSubtitle>

      <ScheduleReadyCard />

      {schedule.map((item, index) => (
        <ScheduleTimelineCard
          key={item.id}
          emoji={item.emoji}
          title={item.title}
          start={item.start}
          end={item.end}
          isLast={index === schedule.length - 1}
        />
      ))}

      <PrimaryButton
        title="Save Schedule"
        onPress={() => navigation.navigate("Home")}
        disabled={false}
      />
    </ScrollScreenContainer>
  );
}
