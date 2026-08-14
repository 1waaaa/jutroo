import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import ScheduleReadyCard from "../../components/schedule/ScheduleReadyCard";
import ScheduleTimelineCard from "../../components/schedule/ScheduleTimelineCard";

import { RootStackParamList } from "../../navigation/types";
import { usePlanner } from "../../context/PlannerContext";
import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GeneratedSchedule"
>;

export default function GeneratedScheduleScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { schedule } = usePlanner();

  return (
    <ScrollScreenContainer>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.header}>
          <Text style={styles.eyebrow}>TODAY</Text>

          <AppTitle>
            Your Day{"\n"}
            is Ready
          </AppTitle>

          <Text style={styles.subtitle}>
            Here's the optimized schedule for today.
          </Text>
        </View>

        <ScheduleReadyCard activityCount={schedule.length} />

        {schedule.length > 0 ? (
          <View style={styles.timeline}>
            {schedule.map((item, index) => (
              <ScheduleTimelineCard
                key={item.id}
                title={item.title}
                start={item.start}
                end={item.end}
                isLast={index === schedule.length - 1}
              />
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nothing planned yet</Text>

            <Text style={styles.emptySubtitle}>
              Create your plan to see your day here.
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Save Schedule"
            onPress={() => navigation.navigate("Home")}
            disabled={false}
          />
        </View>
      </View>
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 72,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 4,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    color: Colors.subtitle,
    marginBottom: 10,
  },

  subtitle: {
    marginTop: 14,
    maxWidth: 320,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.subtitle,
  },

  timeline: {
    marginTop: 2,
    paddingHorizontal: 2,
  },

  empty: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.subtitle,
    textAlign: "center",
  },

  buttonContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
});
