import { useState } from "react";
import { Text, StyleSheet } from "react-native";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import ActivityCard from "../../components/ActivityCard/ActivityCard";

import { ACTIVITIES } from "../../constants/activities";

export default function ActivitiesScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  return (
    <ScrollScreenContainer>
      <AppTitle>
        What are you{"\n"}
        doing today?
      </AppTitle>

      <AppSubtitle>Select every activity you plan to do today.</AppSubtitle>

      <Text style={styles.counter}>{selected.length} activities selected</Text>

      {ACTIVITIES.map((activity) => (
        <ActivityCard
          key={activity.id}
          emoji={activity.emoji}
          title={activity.title}
          description={activity.description}
          selected={selected.includes(activity.id)}
          onPress={() => toggle(activity.id)}
        />
      ))}

      <PrimaryButton title="Continue" onPress={() => {}} />
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  counter: {
    marginVertical: 20,

    fontSize: 15,

    color: "#64748B",
  },
});
