import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import ActivityCard from "../../components/planner/ActivityCard/ActivityCard";
import ActivityBottomSheet from "../../components/ActivityBottomSheet/ActivityBottomSheet";

import {
  ACTIVITIES,
  Activity,
  ConfiguredActivity,
} from "../../constants/activities";

import { RootStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Activities"
>;

export default function ActivitiesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  const [configuredActivities, setConfiguredActivities] = useState<
    ConfiguredActivity[]
  >([]);

  function getConfiguration(type: string) {
    return configuredActivities.find((activity) => activity.type === type);
  }

  function handleSave(configuration: ConfiguredActivity) {
    setConfiguredActivities((previous) => {
      const exists = previous.some(
        (activity) => activity.type === configuration.type,
      );

      if (exists) {
        return previous.map((activity) =>
          activity.type === configuration.type ? configuration : activity,
        );
      }

      return [...previous, configuration];
    });

    setSelectedActivity(null);
  }

  return (
    <>
      <ScrollScreenContainer>
        <BackButton onPress={() => navigation.goBack()} />

        <AppTitle>What are you{"\n"}doing today?</AppTitle>

        <AppSubtitle>
          Build your perfect day by configuring today's activities.
        </AppSubtitle>

        <Text style={styles.counter}>
          {configuredActivities.length} activit
          {configuredActivities.length !== 1 ? "ies" : "y"} configured
        </Text>

        {ACTIVITIES.map((activity) => (
          <ActivityCard
            key={activity.id}
            emoji={activity.emoji}
            title={activity.title}
            configuration={getConfiguration(activity.id)}
            onPress={() => setSelectedActivity(activity)}
          />
        ))}

        <PrimaryButton
          title="Continue"
          disabled={configuredActivities.length === 0}
          onPress={() => navigation.navigate("ReviewPlan")}
        />
      </ScrollScreenContainer>

      <ActivityBottomSheet
        visible={selectedActivity !== null}
        activity={selectedActivity}
        configuration={
          selectedActivity ? getConfiguration(selectedActivity.id) : undefined
        }
        onClose={() => setSelectedActivity(null)}
        onSave={handleSave}
      />
    </>
  );
}

const styles = StyleSheet.create({
  counter: {
    marginTop: 18,
    marginBottom: 18,

    color: Colors.subtitle,

    fontSize: 15,

    fontWeight: "600",
  },
});
