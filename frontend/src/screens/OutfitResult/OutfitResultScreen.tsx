import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ArrowLeft, Check, Sparkles, Shirt } from "lucide-react-native";

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

  if (!outfit) {
    return (
      <ScrollScreenContainer>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.text} />
        </Pressable>

        <AppTitle>No Outfit{"\n"}Selected</AppTitle>

        <AppSubtitle>You haven't selected an outfit yet.</AppSubtitle>

        <PrimaryButton
          title="Choose an Outfit"
          onPress={() => navigation.navigate("OutfitActivity")}
          disabled={false}
        />
      </ScrollScreenContainer>
    );
  }

  const activity = OUTFIT_ACTIVITIES.find(
    (item) => item.id === outfit.activity,
  );

  const items = [
    {
      item: outfit.top,
      title: "Top",
    },
    {
      item: outfit.bottom,
      title: "Bottom",
    },
    {
      item: outfit.shoes,
      title: "Shoes",
    },
    {
      item: outfit.accessory,
      title: "Accessory",
    },
  ].filter(
    (
      entry,
    ): entry is {
      item: NonNullable<typeof entry.item>;
      title: string;
    } => Boolean(entry.item),
  );

  return (
    <ScrollScreenContainer>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} color={Colors.text} />
      </Pressable>

      <View style={styles.hero}>
        <View style={styles.icon}>
          <Sparkles size={30} color={Colors.primary} />
        </View>

        <AppTitle>Your Outfit{"\n"}is Ready</AppTitle>

        <AppSubtitle>
          Here's your {activity?.title.toLowerCase()} outfit.
        </AppSubtitle>
      </View>

      <View style={styles.outfitCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardLabel}>TODAY'S OUTFIT</Text>

            <Text style={styles.cardTitle}>
              {activity?.emoji} {activity?.title}
            </Text>
          </View>

          <View style={styles.check}>
            <Check size={18} color="white" />
          </View>
        </View>

        <View style={styles.items}>
          {items.map(({ item, title }) => (
            <OutfitItem key={`${item.id}-${title}`} item={item} title={title} />
          ))}
        </View>
      </View>

      <View style={styles.reasonCard}>
        <View style={styles.reasonIcon}>
          <Shirt size={22} color={Colors.primary} />
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

function OutfitItem({
  item,
  title,
}: {
  item: {
    id: number;
    uri: string;
  };

  title: string;
}) {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemImage}
      />

      <Text style={styles.itemTitle}>{title}</Text>

      <View style={styles.selectedBadge}>
        <Check size={13} color="white" />
      </View>
    </View>
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

    marginBottom: 18,
  },

  hero: {
    alignItems: "center",
  },

  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor: "#EEF6FF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 14,
  },

  outfitCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 26,

    padding: 20,

    marginTop: 22,

    borderWidth: 1,

    borderColor: "#EEF2F7",
  },

  cardHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,
  },

  cardLabel: {
    fontSize: 12,

    fontWeight: "700",

    letterSpacing: 1.2,

    color: Colors.subtitle,
  },

  cardTitle: {
    fontSize: 24,

    fontWeight: "800",

    color: Colors.text,

    marginTop: 3,
  },

  check: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  items: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 12,
  },

  item: {
    width: "47%",

    position: "relative",
  },

  itemImage: {
    width: "100%",

    aspectRatio: 0.9,

    borderRadius: 18,

    backgroundColor: Colors.surface,
  },

  itemTitle: {
    fontSize: 14,

    fontWeight: "700",

    color: Colors.text,

    marginTop: 8,

    marginLeft: 4,
  },

  selectedBadge: {
    position: "absolute",

    top: 10,

    right: 10,

    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  reasonCard: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F4F8FF",

    borderRadius: 20,

    padding: 18,

    marginTop: 20,

    marginBottom: 24,

    gap: 14,
  },

  reasonIcon: {
    width: 46,
    height: 46,

    borderRadius: 15,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",
  },

  reasonContent: {
    flex: 1,
  },

  reasonTitle: {
    fontSize: 15,

    fontWeight: "800",

    color: Colors.text,

    marginBottom: 4,
  },

  reason: {
    fontSize: 14,

    lineHeight: 20,

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
