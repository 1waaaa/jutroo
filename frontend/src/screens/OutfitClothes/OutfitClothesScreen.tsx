import { useState } from "react";

import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Plus, Trash2, Sparkles } from "lucide-react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteProp } from "@react-navigation/native";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import {
  OUTFIT_CATEGORIES,
  ClothingItem,
  OutfitActivity,
} from "../../constants/outfits";

import { RootStackParamList } from "../../navigation/types";

import { Colors } from "../../theme/colors";

import { useOutfit } from "../../context/OutfitContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OutfitClothes"
>;

type OutfitRouteProp = RouteProp<RootStackParamList, "OutfitClothes">;

export default function OutfitClothesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<OutfitRouteProp>();

  const { activity } = route.params;

  const { setOutfit } = useOutfit();

  const [clothes, setClothes] = useState<ClothingItem[]>([]);

  function addClothingItem(category: ClothingItem["category"], uri: string) {
    const newItem: ClothingItem = {
      id: Date.now(),
      uri,
      category,
    };

    setClothes((previous) => [...previous, newItem]);
  }

  async function pickFromGallery(category: ClothingItem["category"]) {
    const categoryInfo = OUTFIT_CATEGORIES.find((item) => item.id === category);

    if (!categoryInfo) return;

    const currentItems = clothes.filter((item) => item.category === category);

    if (currentItems.length >= categoryInfo.maxItems) {
      Alert.alert(
        "Maximum reached",
        `You can add up to ${categoryInfo.maxItems} ${categoryInfo.title.toLowerCase()}.`,
      );

      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    if (!asset) return;

    addClothingItem(category, asset.uri);
  }

  async function takePhoto(category: ClothingItem["category"]) {
    const categoryInfo = OUTFIT_CATEGORIES.find((item) => item.id === category);

    if (!categoryInfo) return;

    const currentItems = clothes.filter((item) => item.category === category);

    if (currentItems.length >= categoryInfo.maxItems) {
      Alert.alert(
        "Maximum reached",
        `You can add up to ${categoryInfo.maxItems} ${categoryInfo.title.toLowerCase()}.`,
      );

      return;
    }

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Camera permission required",
        "Please allow camera access to take a photo of your clothes.",
      );

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    if (!asset) return;

    addClothingItem(category, asset.uri);
  }

  function removeItem(id: number) {
    setClothes((previous) => previous.filter((item) => item.id !== id));
  }

  function getCategoryItems(category: ClothingItem["category"]) {
    return clothes.filter((item) => item.category === category);
  }

  function openAddOptions(category: ClothingItem["category"]) {
    Alert.alert("Add clothing", "How would you like to add it?", [
      {
        text: "📷 Take a photo",
        onPress: () => takePhoto(category),
      },
      {
        text: "🖼 Choose from gallery",
        onPress: () => pickFromGallery(category),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  function handleContinue() {
    if (clothes.length === 0) {
      Alert.alert(
        "Add some clothes",
        "Please upload at least one clothing item.",
      );

      return;
    }

    /*
     * MOCK RECOMMENDATION
     *
     * Za sada uzimamo prvi komad iz
     * svake kategorije.
     *
     * Kada spojimo backend, OVDE ćemo
     * pozvati POST /api/outfit/recommend
     * i koristiti Gemini indekse.
     */

    const top = getCategoryItems("tops")[0];

    const bottom = getCategoryItems("bottoms")[0];

    const shoes = getCategoryItems("shoes")[0];

    const accessory = getCategoryItems("accessories")[0];

    setOutfit({
      activity,

      top,

      bottom,

      shoes,

      accessory,

      reason: "This outfit is perfect for your activity and today's weather.",
    });

    navigation.navigate("OutfitResult");
  }

  const activityInfo = getActivityInfo(activity);

  return (
    <ScrollScreenContainer>
      <BackButton onPress={() => navigation.goBack()} />

      <AppTitle>
        Your{"\n"}
        {activityInfo.emoji} {activityInfo.title} Outfit
      </AppTitle>

      <AppSubtitle>
        Upload the clothes you want the AI to choose from.
      </AppSubtitle>

      {OUTFIT_CATEGORIES.map((category) => {
        const items = getCategoryItems(category.id);

        return (
          <View key={category.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {category.emoji} {category.title}
              </Text>

              <Text style={styles.counter}>
                {items.length}/{category.maxItems}
              </Text>
            </View>

            <View style={styles.grid}>
              {items.map((item) => (
                <View key={item.id} style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri: item.uri,
                    }}
                    style={styles.image}
                  />

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Trash2 size={15} color="white" />
                  </Pressable>
                </View>
              ))}

              {items.length < category.maxItems && (
                <Pressable
                  style={styles.addCard}
                  onPress={() => openAddOptions(category.id)}
                >
                  <View style={styles.plusCircle}>
                    <Plus size={25} color={Colors.primary} />
                  </View>

                  <Text style={styles.addText}>Add</Text>
                </Pressable>
              )}
            </View>
          </View>
        );
      })}

      <View style={styles.infoCard}>
        <Sparkles size={20} color={Colors.primary} />

        <Text style={styles.infoText}>
          We'll consider your activity and today's weather when choosing your
          outfit.
        </Text>
      </View>

      <PrimaryButton
        title="✨ Get Outfit Recommendation"
        onPress={handleContinue}
        disabled={clothes.length === 0}
      />
    </ScrollScreenContainer>
  );
}

function getActivityInfo(activity: OutfitActivity) {
  const activities = {
    UNIVERSITY: {
      title: "University",
      emoji: "🎓",
    },

    GYM: {
      title: "Gym",
      emoji: "🏋️",
    },

    WALK: {
      title: "Walk",
      emoji: "🚶",
    },

    SHOPPING: {
      title: "Shopping",
      emoji: "🛍️",
    },

    DINNER: {
      title: "Dinner",
      emoji: "🍽️",
    },

    DATE: {
      title: "Date",
      emoji: "❤️",
    },
  };

  return activities[activity];
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },

  sectionHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "800",

    color: Colors.text,
  },

  counter: {
    fontSize: 14,

    fontWeight: "600",

    color: Colors.subtitle,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 12,
  },

  imageWrapper: {
    width: "31%",

    aspectRatio: 0.82,

    borderRadius: 18,

    overflow: "hidden",

    backgroundColor: Colors.surface,

    position: "relative",
  },

  image: {
    width: "100%",

    height: "100%",

    resizeMode: "cover",
  },

  removeButton: {
    position: "absolute",

    top: 8,

    right: 8,

    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor: "rgba(0,0,0,0.65)",

    justifyContent: "center",

    alignItems: "center",
  },

  addCard: {
    width: "31%",

    aspectRatio: 0.82,

    borderRadius: 18,

    borderWidth: 1.5,

    borderStyle: "dashed",

    borderColor: Colors.border,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",
  },

  plusCircle: {
    width: 44,

    height: 44,

    borderRadius: 22,

    backgroundColor: "#EEF6FF",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 8,
  },

  addText: {
    fontSize: 14,

    fontWeight: "700",

    color: Colors.subtitle,
  },

  infoCard: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    backgroundColor: "#F4F8FF",

    borderRadius: 18,

    padding: 16,

    marginTop: 28,

    marginBottom: 24,
  },

  infoText: {
    flex: 1,

    fontSize: 14,

    lineHeight: 20,

    color: Colors.subtitle,
  },
});
