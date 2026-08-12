import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
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

  function toMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  }

  function overlaps(
    start1: string,
    end1: string,
    start2: string,
    end2: string,
  ) {
    const firstStart = toMinutes(start1);
    const firstEnd = toMinutes(end1);

    const secondStart = toMinutes(start2);
    const secondEnd = toMinutes(end2);

    return firstStart < secondEnd && secondStart < firstEnd;
  }

  function handleSave(configuration: ConfiguredActivity) {
    const conflict = configuredActivities.find((activity) => {
      if (!activity.fixed || !configuration.fixed) {
        return false;
      }

      if (activity.type === configuration.type) {
        return false;
      }

      return overlaps(
        activity.earliest,
        activity.latest,
        configuration.earliest,
        configuration.latest,
      );
    });

    if (conflict) {
      const activityInfo = ACTIVITIES.find(
        (activity) => activity.id === conflict.type,
      );

      Alert.alert(
        "Time Conflict",
        `This overlaps with ${activityInfo?.title ?? conflict.type} (${conflict.earliest} - ${conflict.latest}).\n\nPlease choose another time.`,
      );

      return;
    }

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

  const activityCount = configuredActivities.length;

  return (
    <>
      <ScrollScreenContainer>
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />

          <View style={styles.header}>
            <Text style={styles.eyebrow}>YOUR DAY</Text>

            <AppTitle>
              What are you{"\n"}
              doing today?
            </AppTitle>

            <Text style={styles.subtitle}>
              Choose what matters today and we'll organize everything around it.
            </Text>
          </View>

          <View style={styles.progressRow}>
            <View>
              <Text style={styles.progressLabel}>TODAY'S ACTIVITIES</Text>

              <Text style={styles.progressCount}>{activityCount} selected</Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width:
                      activityCount === 0
                        ? "0%"
                        : `${Math.min(
                            (activityCount / ACTIVITIES.length) * 100,
                            100,
                          )}%`,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.activities}>
            {ACTIVITIES.map((activity) => (
              <ActivityCard
                key={activity.id}
                emoji={activity.emoji}
                title={activity.title}
                configuration={getConfiguration(activity.id)}
                onPress={() => setSelectedActivity(activity)}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={activityCount > 0 ? "Continue" : "Choose an Activity"}
              disabled={activityCount === 0}
              onPress={() =>
                navigation.navigate("ReviewPlan", {
                  activities: configuredActivities,
                })
              }
            />
          </View>
        </View>
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
  container: {
    flex: 1,
    marginTop: 72,
  },

  header: {
    alignItems: "center",

    paddingHorizontal: 14,

    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 3,

    color: Colors.subtitle,

    marginBottom: 10,
  },

  subtitle: {
    maxWidth: 320,

    marginTop: 14,

    textAlign: "center",

    fontSize: 15,

    lineHeight: 22,

    color: Colors.subtitle,
  },

  progressRow: {
    marginBottom: 20,

    paddingHorizontal: 4,

    color: Colors.coral,
  },

  progressLabel: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    color: Colors.subtitle,
  },

  progressCount: {
    marginTop: 5,

    fontSize: 14,

    fontWeight: "600",

    color: Colors.text,
  },

  progressTrack: {
    height: 4,

    width: "100%",

    marginTop: 11,

    borderRadius: 999,

    overflow: "hidden",

    backgroundColor: Colors.mist,
  },

  progressFill: {
    height: "100%",

    borderRadius: 999,

    backgroundColor: Colors.coral,
  },

  activities: {
    gap: 12,
  },

  buttonContainer: {
    marginTop: 24,

    marginBottom: 24,
  },
});
