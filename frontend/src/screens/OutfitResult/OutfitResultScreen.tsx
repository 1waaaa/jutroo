import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  ArrowLeft,
  Check,
  Sparkles,
  Shirt,
  Footprints,
  ShoppingBag,
  Gem,
} from "lucide-react-native";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppSubtitle from "../../components/AppSubtitle/AppSubtitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { RootStackParamList } from "../../navigation/types";

import { useOutfit } from "../../context/OutfitContext";

import { OUTFIT_ACTIVITIES } from "../../constants/outfits";

import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OutfitResult"
>;

export default function OutfitResultScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { outfit } = useOutfit();

  /*
   * No outfit available.
   */
  if (!outfit) {
    return (
      <ScrollScreenContainer>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.text} />
        </Pressable>

        <View style={styles.empty}>
          <AppTitle>No Outfit{"\n"}Selected</AppTitle>

          <AppSubtitle>You haven't selected an outfit yet.</AppSubtitle>

          <PrimaryButton
            title="Choose an Outfit"
            onPress={() => navigation.navigate("OutfitActivity")}
            disabled={false}
          />
        </View>
      </ScrollScreenContainer>
    );
  }

  const activity = OUTFIT_ACTIVITIES.find(
    (item) => item.id === outfit.activity,
  );

  const generated = outfit.generated;

  /*
   * Clothing selected by Gemini.
   */
  const clothingItems = [
    {
      title: "Top",
      item: generated.top,
      Icon: Shirt,
    },
    {
      title: "Bottom",
      item: generated.bottom,
      Icon: ShoppingBag,
    },
    {
      title: "Shoes",
      item: generated.shoes,
      Icon: Footprints,
    },
    {
      title: "Outerwear",
      item: generated.outerwear,
      Icon: Shirt,
    },
  ].filter((item) => item.item !== null);

  return (
    <ScrollScreenContainer>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} color={Colors.text} />
      </Pressable>

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Sparkles size={27} color={Colors.coral} strokeWidth={1.8} />
        </View>

        <AppTitle>Your Outfit{"\n"}is Ready</AppTitle>

        <AppSubtitle>
          Here's your {activity?.title.toLowerCase()} outfit, styled just for
          you.
        </AppSubtitle>
      </View>

      <View style={styles.outfitCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardLabel}>TODAY'S OUTFIT</Text>

            <Text style={styles.cardTitle}>{activity?.title}</Text>
          </View>

          <View style={styles.check}>
            <Check size={18} color={Colors.surface} strokeWidth={2.5} />
          </View>
        </View>

        <View style={styles.items}>
          {clothingItems.map(({ title, item, Icon }) => {
            if (!item) {
              return null;
            }

            return (
              <View key={`${title}-${item.id}`} style={styles.item}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.itemImage}
                />

                <View style={styles.itemContent}>
                  <View style={styles.itemTitleRow}>
                    <View style={styles.itemIcon}>
                      <Icon size={19} color={Colors.ink} strokeWidth={1.7} />
                    </View>

                    <Text style={styles.itemTitle}>{title}</Text>
                  </View>

                  <Text style={styles.itemDescription} numberOfLines={1}>
                    {item.filename}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {generated.accessories.length > 0 && (
          <View style={styles.accessories}>
            <View style={styles.accessoryHeader}>
              <View style={styles.accessoryIcon}>
                <Gem size={19} color={Colors.ink} strokeWidth={1.7} />
              </View>

              <Text style={styles.accessoryTitle}>Accessories</Text>
            </View>

            {generated.accessories.map((accessory) => (
              <View key={accessory.id} style={styles.accessoryItem}>
                <Image
                  source={{
                    uri: accessory.image,
                  }}
                  style={styles.accessoryImage}
                />

                <Text style={styles.accessoryText} numberOfLines={1}>
                  {accessory.filename}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.reasonCard}>
        <View style={styles.reasonIcon}>
          <Sparkles size={20} color={Colors.coral} strokeWidth={1.8} />
        </View>

        <View style={styles.reasonContent}>
          <Text style={styles.reasonTitle}>Why this outfit?</Text>

          <Text style={styles.reason}>{outfit.reason}</Text>
        </View>
      </View>

      <PrimaryButton
        title="Back to Home"
        onPress={() => navigation.navigate("Home")}
        disabled={false}
      />

      <Pressable
        style={styles.changeButton}
        onPress={() => navigation.navigate("OutfitActivity")}
      >
        <Text style={styles.changeText}>Create a different outfit</Text>
      </Pressable>
    </ScrollScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 72,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  empty: {
    alignItems: "center",
  },

  hero: {
    alignItems: "center",
  },

  heroIcon: {
    width: 64,
    height: 64,

    borderRadius: 22,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 15,

    borderWidth: 1,
    borderColor: "rgba(217,130,114,0.16)",
  },

  outfitCard: {
    backgroundColor: Colors.surface,

    borderRadius: 26,

    padding: 20,

    marginTop: 24,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  cardHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,
  },

  cardLabel: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 1.8,

    color: Colors.subtitle,
  },

  cardTitle: {
    fontSize: 24,

    fontWeight: "800",

    color: Colors.text,

    marginTop: 4,

    letterSpacing: -0.5,
  },

  check: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: Colors.coral,

    justifyContent: "center",
    alignItems: "center",
  },

  items: {
    gap: 10,
  },

  item: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.ivory,

    borderRadius: 18,

    padding: 10,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  itemImage: {
    width: 58,
    height: 58,

    borderRadius: 14,

    backgroundColor: Colors.mist,
  },

  itemContent: {
    flex: 1,

    marginLeft: 12,
  },

  itemTitleRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  itemIcon: {
    width: 30,
    height: 30,

    borderRadius: 10,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,
  },

  itemTitle: {
    fontSize: 11,

    fontWeight: "800",

    textTransform: "uppercase",

    letterSpacing: 1.1,

    color: Colors.subtitle,
  },

  itemDescription: {
    fontSize: 12,

    fontWeight: "600",

    color: Colors.text,

    marginTop: 5,

    maxWidth: "90%",
  },

  accessories: {
    marginTop: 16,

    paddingTop: 16,

    borderTopWidth: 1,

    borderTopColor: Colors.border,
  },

  accessoryHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 12,
  },

  accessoryIcon: {
    width: 38,
    height: 38,

    borderRadius: 13,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  accessoryTitle: {
    fontSize: 15,

    fontWeight: "800",

    color: Colors.text,
  },

  accessoryItem: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,
  },

  accessoryImage: {
    width: 44,
    height: 44,

    borderRadius: 13,

    backgroundColor: Colors.mist,

    marginRight: 10,
  },

  accessoryText: {
    flex: 1,

    fontSize: 13,

    color: Colors.subtitle,

    fontWeight: "600",
  },

  reasonCard: {
    flexDirection: "row",

    alignItems: "flex-start",

    backgroundColor: Colors.ivory,

    borderRadius: 20,

    padding: 18,

    marginTop: 20,

    marginBottom: 24,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  reasonIcon: {
    width: 44,
    height: 44,

    borderRadius: 15,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  reasonContent: {
    flex: 1,
  },

  reasonTitle: {
    fontSize: 15,

    fontWeight: "800",

    color: Colors.text,

    marginBottom: 5,
  },

  reason: {
    fontSize: 14,

    lineHeight: 21,

    color: Colors.subtitle,
  },

  changeButton: {
    alignItems: "center",

    paddingVertical: 18,

    marginBottom: 20,
  },

  changeText: {
    fontSize: 15,

    fontWeight: "700",

    color: Colors.subtitle,
  },
});
