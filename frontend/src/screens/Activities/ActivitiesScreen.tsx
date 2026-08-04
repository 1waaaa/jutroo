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

  function getConfiguration(id: string) {
    return configuredActivities.find((x) => x.id === id);
  }

  function handleSave(configuration: ConfiguredActivity) {
    setConfiguredActivities((prev) => {
      const exists = prev.find((x) => x.id === configuration.id);

      if (exists) {
        return prev.map((item) =>
          item.id === configuration.id ? configuration : item,
        );
      }

      return [...prev, configuration];
    });

    setSelectedActivity(null);
  }

  return (
    <>
      <ScrollScreenContainer>
        <BackButton onPress={() => navigation.goBack()} />

        <AppTitle>What are you{"\n"}doing today?</AppTitle>

        <AppSubtitle>Select the activities you plan to do today.</AppSubtitle>

        <Text style={styles.counter}>
          {configuredActivities.length} configured
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
          onPress={() => navigation.navigate("ReviewPlan")}
          disabled={configuredActivities.length === 0}
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
  },
});
