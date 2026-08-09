import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ChevronRight, Check } from "lucide-react-native";

import { SelectedOutfit } from "../../context/OutfitContext";
import { OUTFIT_ACTIVITIES } from "../../constants/outfits";
import { Colors } from "../../theme/colors";

interface Props {
  outfit: SelectedOutfit;
  onPress: () => void;
}

export default function TodayOutfitCard({ outfit, onPress }: Props) {
  const activity = OUTFIT_ACTIVITIES.find(
    (item) => item.id === outfit.activity,
  );

  const items = [
    outfit.top,
    outfit.bottom,
    outfit.shoes,
    outfit.accessory,
  ].filter(Boolean);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View>
          <View style={styles.labelRow}>
            <Text style={styles.label}>TODAY'S OUTFIT</Text>

            <View style={styles.check}>
              <Check size={12} color="white" />
            </View>
          </View>

          <Text style={styles.title}>Your {activity?.title ?? "Outfit"}</Text>
        </View>

        <ChevronRight size={22} color={Colors.subtitle} />
      </View>

      <View style={styles.images}>
        {items.map((item, index) => {
          if (!item) return null;

          return (
            <Image
              key={`${item.id}-${index}`}
              source={{
                uri: item.uri,
              }}
              style={[styles.image, index > 0 && styles.imageOverlap]}
            />
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.reason} numberOfLines={2}>
          {outfit.reason}
        </Text>

        <Text style={styles.viewText}>View outfit</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 20,
    marginBottom: 22,

    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  pressed: {
    opacity: 0.85,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 4,
  },

  label: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: Colors.subtitle,
  },

  check: {
    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 23,
    fontWeight: "800",
    color: Colors.text,
  },

  images: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 18,
    paddingLeft: 4,
  },

  image: {
    width: 78,
    height: 78,

    borderRadius: 20,

    borderWidth: 3,
    borderColor: "#FFFFFF",

    backgroundColor: Colors.surface,
  },

  imageOverlap: {
    marginLeft: -16,
  },

  footer: {
    marginTop: 17,
    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
  },

  reason: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.subtitle,
  },

  viewText: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.primary,

    marginTop: 8,
  },
});
