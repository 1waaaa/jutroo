import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import OutfitActivityCard from "../../components/outfit/OutfitActivityCard";

import { OUTFIT_ACTIVITIES, OutfitActivity } from "../../constants/outfits";

import { RootStackParamList } from "../../navigation/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OutfitActivity"
>;

export default function OutfitActivityScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [selectedActivity, setSelectedActivity] =
    useState<OutfitActivity | null>(null);

  return (
    <ScrollScreenContainer>
      <View style={styles.back}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <AppTitle>
        Which activity{"\n"}
        are you dressing for?
      </AppTitle>

      <AppSubtitle>
        Choose what you're doing and we'll help you build the perfect outfit.
      </AppSubtitle>

      <View style={styles.grid}>
        {OUTFIT_ACTIVITIES.map((activity) => (
          <OutfitActivityCard
            key={activity.id}
            activityId={activity.id}
            title={activity.title}
            selected={selectedActivity === activity.id}
            onPress={() => setSelectedActivity(activity.id)}
          />
        ))}
      </View>

      <PrimaryButton
        title="Choose My Clothes"
        disabled={!selectedActivity}
        onPress={() => {
          if (!selectedActivity) return;

          navigation.navigate("OutfitClothes", {
            activity: selectedActivity,
          });
        }}
      />
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 72,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 24,
  },
});
