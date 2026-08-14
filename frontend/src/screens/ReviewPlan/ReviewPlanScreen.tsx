import { Pressable, StyleSheet, Text, Alert, View } from "react-native";
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

import { generatePlan, mapPlanToSchedule } from "../../api/plannerApi";

import { usePlanner } from "../../context/PlannerContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ReviewPlan"
>;

type ReviewRoute = RouteProp<RootStackParamList, "ReviewPlan">;

export default function ReviewPlanScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ReviewRoute>();

  const { activities } = route.params;

  const { setSchedule } = usePlanner();

  const totalMinutes = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0,
  );

  async function handleGenerate() {
    try {
      const storedId = await AsyncStorage.getItem("userId");

      if (!storedId) {
        Alert.alert("Something went wrong", "We couldn't find your account.");

        return;
      }

      const plannerActivities = activities.map((activity) => {
        const activityDefinition = ACTIVITIES.find(
          (item) => item.id === activity.type,
        );

        return {
          ...activity,
          outdoor: activityDefinition?.outdoor ?? false,
        };
      });

      const result = await generatePlan({
        userId: Number(storedId),
        activities: plannerActivities,
      });

      const schedule = mapPlanToSchedule(result.plan);

      setSchedule(schedule);

      navigation.replace("GeneratingPlan");
    } catch (error) {
      console.log("Plan generation failed:", error);

      Alert.alert(
        "Something went wrong",
        "We couldn't generate your plan. Please try again.",
      );
    }
  }

  return (
    <ScrollScreenContainer>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.header}>
          <Text style={styles.eyebrow}>ALMOST THERE</Text>

          <AppTitle>Review{"\n"}Today's Plan</AppTitle>

          <AppSubtitle>
            Take one last look before we build your personalized schedule.
          </AppSubtitle>
        </View>

        <View style={styles.activities}>
          {activities.map((configuration) => {
            const activity = ACTIVITIES.find(
              (item) => item.id === configuration.type,
            );

            if (!activity) {
              return null;
            }

            return (
              <PlannerReviewCard
                key={activity.id}
                activity={activity}
                configuration={configuration}
              />
            );
          })}
        </View>

        <PlannerSummaryCard
          activityCount={activities.length}
          totalMinutes={totalMinutes}
        />

        <View style={styles.cta}>
          <PrimaryButton
            title="Generate My Day"
            onPress={handleGenerate}
            disabled={false}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.editPressed,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.editArrow}>←</Text>

          <Text style={styles.edit}>Edit Activities</Text>
        </Pressable>
      </View>
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingTop: 72,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 30,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.8,
    color: Colors.water,
    marginBottom: 10,
  },

  activities: {
    gap: 2,
  },

  cta: {
    marginTop: 8,
  },

  editButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },

  editPressed: {
    backgroundColor: Colors.mist,
  },

  editArrow: {
    fontSize: 17,
    color: Colors.subtitle,
    marginRight: 6,
  },

  edit: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.subtitle,
  },
});
