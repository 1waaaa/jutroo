import { Pressable, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import PlannerReviewCard from "../../components/planner/PlannerReviewCard";
import PlannerSummaryCard from "../../components/planner/PlannerSummaryCard";

import { ACTIVITIES } from "../../constants/activities";

import { RootStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";

import { generatePlan } from "../../api/plannerApi";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ReviewPlan"
>;

type ReviewRoute = RouteProp<RootStackParamList, "ReviewPlan">;

export default function ReviewPlanScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<ReviewRoute>();

  const { activities } = route.params;

  const totalMinutes = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0,
  );

  async function handleGenerate() {
    try {
      const storedId = await AsyncStorage.getItem("userId");

      /*if (!storedId) {
        Alert.alert("Error", "User not found.");
        return;
      }*/

      await generatePlan({
        userId: Number(storedId),
        activities,
      });

      navigation.replace("GeneratingPlan");
    } catch (error) {
      console.log(error);

      Alert.alert("Oops!", "Failed to generate your plan.");
    }
  }

  return (
    <ScrollScreenContainer>
      <BackButton onPress={() => navigation.goBack()} />

      <AppTitle>Review{"\n"}Today's Plan</AppTitle>

      <AppSubtitle>
        Take one last look before we build your personalized schedule.
      </AppSubtitle>

      {activities.map((configuration) => {
        const activity = ACTIVITIES.find(
          (item) => item.id === configuration.type,
        );

        if (!activity) return null;

        return (
          <PlannerReviewCard
            key={activity.id}
            activity={activity}
            configuration={configuration}
          />
        );
      })}

      <PlannerSummaryCard
        activityCount={activities.length}
        totalMinutes={totalMinutes}
      />

      <PrimaryButton
        title="✨ Generate My Day"
        onPress={handleGenerate}
        disabled={false}
      />

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.edit}>← Edit Activities</Text>
      </Pressable>
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  edit: {
    marginTop: 18,

    marginBottom: 30,

    textAlign: "center",

    color: Colors.subtitle,

    fontSize: 16,

    fontWeight: "600",
  },
});
