import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Plus, Trash2, Sparkles, Check } from "lucide-react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import BackButton from "../../components/BackButton/BackButton";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { recommendOutfit } from "../../api/outfitApi";

import {
  OUTFIT_CATEGORIES,
  ClothingItem,
  OutfitActivity,
} from "../../constants/outfits";

import {
  OUTFIT_ACTIVITY_ICONS,
  OUTFIT_CATEGORY_ICONS,
} from "../../constants/outfitIcons";

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

    if (result.canceled) return;

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

    if (result.canceled) return;

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
    Alert.alert("Add clothing", "Choose how you'd like to add this item.", [
      {
        text: "Take a photo",
        onPress: () => takePhoto(category),
      },
      {
        text: "Choose from gallery",
        onPress: () => pickFromGallery(category),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  async function handleContinue() {
    if (clothes.length === 0) {
      Alert.alert(
        "Add some clothes",
        "Please upload at least one clothing item.",
      );

      return;
    }

    const tops = getCategoryItems("tops");
    const bottoms = getCategoryItems("bottoms");
    const shoes = getCategoryItems("shoes");
    const accessories = getCategoryItems("accessories");

    try {
      const top = tops[0];
      const bottom = bottoms[0];
      const selectedShoes = shoes[0];
      const accessory = accessories[0];

      setOutfit({
        activity,
        top,
        bottom,
        shoes: selectedShoes,
        accessory,
        reason: "This outfit is perfect for your activity and today's weather.",
      });

      navigation.navigate("OutfitResult");
    } catch (error) {
      console.log("Outfit recommendation failed:", error);

      Alert.alert(
        "Something went wrong",
        "We couldn't create your outfit recommendation.",
      );
    }
  }

  const ActivityIcon = OUTFIT_ACTIVITY_ICONS[activity];

  return (
    <ScrollScreenContainer>
      <View style={styles.back}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.hero}>
        <View style={styles.activityIcon}>
          {ActivityIcon && (
            <ActivityIcon size={28} color={Colors.ink} strokeWidth={1.7} />
          )}
        </View>

        <AppTitle>
          Your{"\n"}
          {getActivityTitle(activity)} Outfit
        </AppTitle>

        <AppSubtitle>
          Upload the pieces you want Jutro to style for you.
        </AppSubtitle>
      </View>

      <View style={styles.categories}>
        {OUTFIT_CATEGORIES.map((category) => {
          const items = getCategoryItems(category.id);
          const CategoryIcon = OUTFIT_CATEGORY_ICONS[category.id];

          return (
            <View key={category.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <View style={styles.categoryIcon}>
                    {CategoryIcon && (
                      <CategoryIcon
                        size={19}
                        color={Colors.ink}
                        strokeWidth={1.7}
                      />
                    )}
                  </View>

                  <View style={styles.sectionText}>
                    <Text style={styles.sectionTitle}>{category.title}</Text>
                  </View>
                </View>

                <View style={styles.counter}>
                  <Text style={styles.counterText}>
                    {items.length}/{category.maxItems}
                  </Text>
                </View>
              </View>

              <View style={styles.grid}>
                {items.map((item) => (
                  <View key={item.id} style={styles.imageWrapper}>
                    <Image source={{ uri: item.uri }} style={styles.image} />

                    <View style={styles.selectedBadge}>
                      <Check size={13} color={Colors.ink} strokeWidth={2.8} />
                    </View>

                    <Pressable
                      style={({ pressed }) => [
                        styles.removeButton,
                        pressed && styles.pressed,
                      ]}
                      onPress={() => removeItem(item.id)}
                    >
                      <Trash2
                        size={14}
                        color={Colors.surface}
                        strokeWidth={2}
                      />
                    </Pressable>
                  </View>
                ))}

                {items.length < category.maxItems && (
                  <Pressable
                    style={({ pressed }) => [
                      styles.addCard,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => openAddOptions(category.id)}
                  >
                    <View style={styles.plusCircle}>
                      <Plus size={21} color={Colors.ink} strokeWidth={1.7} />
                    </View>

                    <Text style={styles.addText}>Add item</Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Get Outfit Recommendation"
          onPress={handleContinue}
          disabled={clothes.length === 0}
        />
      </View>
    </ScrollScreenContainer>
  );
}

function getActivityTitle(activity: OutfitActivity) {
  const titles: Record<string, string> = {
    UNIVERSITY: "University",
    GYM: "Gym",
    WALK: "Walk",
    SHOPPING: "Shopping",
    DINNER: "Dinner",
    DATE: "Date",
  };

  return titles[activity] ?? "Daily";
}

const styles = StyleSheet.create({
  back: {
    marginTop: 72,
  },

  hero: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },

  activityIcon: {
    width: 68,
    height: 68,
    borderRadius: 23,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  categories: {
    marginTop: 12,
  },

  section: {
    marginTop: 26,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 13,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",

    flex: 1,
  },

  categoryIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 11,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  sectionText: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",

    color: Colors.text,

    letterSpacing: -0.3,
  },

  sectionSubtitle: {
    marginTop: 2,

    fontSize: 12,
    fontWeight: "500",

    color: Colors.subtitle,
  },

  counter: {
    minWidth: 48,
    height: 30,

    paddingHorizontal: 10,

    borderRadius: 15,

    backgroundColor: Colors.ivory,

    borderWidth: 1,
    borderColor: Colors.border,

    justifyContent: "center",
    alignItems: "center",
  },

  counterText: {
    fontSize: 11,
    fontWeight: "800",

    color: Colors.subtitle,

    letterSpacing: 0.2,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 12,
  },

  imageWrapper: {
    width: "31%",
    aspectRatio: 0.82,

    borderRadius: 21,

    overflow: "hidden",

    backgroundColor: Colors.surface,

    position: "relative",

    borderWidth: 1,
    borderColor: Colors.border,
  },

  image: {
    width: "100%",
    height: "100%",

    resizeMode: "cover",
  },

  selectedBadge: {
    position: "absolute",

    left: 8,
    bottom: 8,

    width: 26,
    height: 26,

    borderRadius: 13,

    backgroundColor: "rgba(255,255,255,0.94)",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: Colors.ink,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  removeButton: {
    position: "absolute",

    top: 8,
    right: 8,

    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: "rgba(36,52,71,0.76)",

    justifyContent: "center",
    alignItems: "center",
  },

  addCard: {
    width: "31%",

    aspectRatio: 0.82,

    paddingBottom: 15,

    borderRadius: 21,

    borderWidth: 1,

    borderColor: Colors.border,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",
  },

  plusCircle: {
    width: 32,
    height: 32,

    borderRadius: 24,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 9,
  },

  addText: {
    fontSize: 12,
    fontWeight: "700",

    color: Colors.subtitle,

    letterSpacing: 0.1,
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.ivory,

    borderRadius: 23,

    padding: 17,

    marginTop: 30,
    marginBottom: 22,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  infoIcon: {
    width: 42,
    height: 42,

    borderRadius: 15,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",

    color: Colors.text,

    marginBottom: 3,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 18,

    color: Colors.subtitle,
  },

  buttonContainer: {
    marginBottom: 24,
  },
});
