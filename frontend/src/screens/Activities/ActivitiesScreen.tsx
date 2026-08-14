import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import ActivityCard from "../../components/planner/ActivityCard/ActivityCard";
import ActivityBottomSheet from "../../components/ActivityBottomSheet/ActivityBottomSheet";

import { ACTIVITIES, ConfiguredActivity } from "../../constants/activities";
import { ACTIVITY_ICONS } from "../../constants/activityIcons";

import { RootStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Activities"
>;

export default function ActivitiesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [configurations, setConfigurations] = useState<
    Record<string, ConfiguredActivity>
  >({});

  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );

  const selectedActivity = useMemo(
    () =>
      ACTIVITIES.find((activity) => activity.id === selectedActivityId) ?? null,
    [selectedActivityId],
  );

  const selectedConfiguration = selectedActivityId
    ? configurations[selectedActivityId]
    : undefined;

  function openActivity(activityId: string) {
    setSelectedActivityId(activityId);
  }

  function closeActivity() {
    setSelectedActivityId(null);
  }

  function handleSave(configuration: ConfiguredActivity) {
    setConfigurations((current) => ({
      ...current,
      [configuration.type]: configuration,
    }));

    setSelectedActivityId(null);
  }

  function handleContinue() {
    const activities = ACTIVITIES.map(
      (activity) => configurations[activity.id],
    ).filter((configuration): configuration is ConfiguredActivity =>
      Boolean(configuration),
    );

    if (activities.length === 0) {
      return;
    }

    navigation.navigate("ReviewPlan", {
      activities,
    });
  }

  const configuredCount = Object.keys(configurations).length;

  return (
    <ScrollScreenContainer>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.header}>
          <Text style={styles.eyebrow}>PLAN YOUR DAY</Text>

          <AppTitle>
            What are you{"\n"}
            doing today?
          </AppTitle>

          <AppSubtitle>
            Choose the activities you want to fit into your day.
          </AppSubtitle>
        </View>

        <View style={styles.activities}>
          {ACTIVITIES.map((activity) => {
            const Icon = ACTIVITY_ICONS[activity.id];

            if (!Icon) {
              return null;
            }

            return (
              <ActivityCard
                key={activity.id}
                icon={Icon}
                title={activity.title}
                configuration={configurations[activity.id]}
                onPress={() => openActivity(activity.id)}
              />
            );
          })}
        </View>

        <View style={styles.bottom}>
          <Text style={styles.selectedText}>
            {configuredCount === 0
              ? "Choose at least one activity"
              : `${configuredCount} ${
                  configuredCount === 1 ? "activity" : "activities"
                } selected`}
          </Text>

          <View style={styles.cta}>
            <PrimaryButton
              title="Review Today's Plan"
              onPress={handleContinue}
              disabled={configuredCount === 0}
            />
          </View>

          {configuredCount > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.clearButton,
                pressed && styles.clearPressed,
              ]}
              onPress={() => setConfigurations({})}
            >
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ActivityBottomSheet
        activity={selectedActivity}
        visible={selectedActivity !== null}
        configuration={selectedConfiguration}
        onClose={closeActivity}
        onSave={handleSave}
      />
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 72,
    paddingBottom: 30,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 10,
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
    gap: 0,
  },

  cta: {
    paddingHorizontal: 10,
  },

  bottom: {
    marginTop: 12,
    alignItems: "center",
  },

  selectedText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.subtitle,
    marginBottom: 12,
  },

  clearButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 5,
  },

  clearPressed: {
    backgroundColor: Colors.mist,
  },

  clearText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.subtitle,
  },
});
