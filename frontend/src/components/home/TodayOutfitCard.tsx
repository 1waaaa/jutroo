import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  ArrowUpRight,
  Check,
  Shirt,
  Footprints,
  ShoppingBag,
  Gem,
} from "lucide-react-native";

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

  const generated = outfit.generated;

  const items = [
    {
      label: "Top",
      value: generated.top,
      Icon: Shirt,
    },
    {
      label: "Bottom",
      value: generated.bottom,
      Icon: ShoppingBag,
    },
    {
      label: "Shoes",
      value: generated.shoes,
      Icon: Footprints,
    },
  ];

  if (generated.outerwear) {
    items.push({
      label: "Outerwear",
      value: generated.outerwear,
      Icon: Shirt,
    });
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <View style={styles.labelRow}>
            <Text style={styles.eyebrow}>STYLE FOR TODAY</Text>

            <View style={styles.check}>
              <Check size={11} color={Colors.ivory} strokeWidth={3} />
            </View>
          </View>

          <Text style={styles.title}>{activity?.title ?? "Your outfit"}</Text>
        </View>

        <View style={styles.arrow}>
          <ArrowUpRight size={19} color={Colors.text} strokeWidth={2} />
        </View>
      </View>

      {/* CLOTHING ITEMS */}
      <View style={styles.look}>
        {items.slice(0, 3).map(({ label, value, Icon }) => {
          if (!value) {
            return null;
          }

          return (
            <View key={`${label}-${value.id}`} style={styles.item}>
              <View style={styles.itemIcon}>
                <Icon size={23} color={Colors.ink} strokeWidth={1.7} />
              </View>

              <Text style={styles.itemLabel}>{label}</Text>

              <Text style={styles.itemValue} numberOfLines={2}>
                {value.filename}
              </Text>
            </View>
          );
        })}
      </View>

      {/* ACCESSORIES */}
      {generated.accessories.length > 0 && (
        <View style={styles.accessories}>
          <View style={styles.accessoryHeader}>
            <View style={styles.accessoryIcon}>
              <Gem size={16} color={Colors.ink} strokeWidth={1.7} />
            </View>

            <Text style={styles.accessoryLabel}>ACCESSORIES</Text>
          </View>

          <Text style={styles.accessoryText} numberOfLines={1}>
            {generated.accessories
              .map((accessory) => accessory.filename)
              .join(" · ")}
          </Text>
        </View>
      )}

      {/* REASON */}
      <View style={styles.bottom}>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>WHY THIS LOOK</Text>

          <Text style={styles.reason} numberOfLines={2}>
            {outfit.reason}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,

    padding: 20,

    borderRadius: 30,

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    overflow: "hidden",
  },

  pressed: {
    transform: [{ scale: 0.985 }],

    opacity: 0.94,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  labelRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginBottom: 5,
  },

  eyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2.2,

    color: Colors.subtitle,
  },

  check: {
    width: 17,

    height: 17,

    borderRadius: 8.5,

    backgroundColor: Colors.success,

    justifyContent: "center",

    alignItems: "center",
  },

  title: {
    fontSize: 25,

    fontWeight: "800",

    letterSpacing: -0.7,

    color: Colors.text,
  },

  arrow: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: Colors.ivory,

    justifyContent: "center",

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,
  },

  look: {
    flexDirection: "row",

    gap: 9,

    marginTop: 22,
  },

  item: {
    flex: 1,

    minHeight: 122,

    padding: 11,

    borderRadius: 20,

    backgroundColor: Colors.ivory,

    borderWidth: 1,

    borderColor: Colors.border,
  },

  itemIcon: {
    width: 39,

    height: 39,

    borderRadius: 14,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 10,
  },

  itemLabel: {
    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.3,

    color: Colors.subtitle,

    marginBottom: 4,
  },

  itemValue: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "700",

    color: Colors.text,
  },

  accessories: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 10,

    paddingHorizontal: 12,

    paddingVertical: 10,

    borderRadius: 16,

    backgroundColor: Colors.mist,
  },

  accessoryHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginRight: 9,
  },

  accessoryIcon: {
    width: 28,

    height: 28,

    borderRadius: 10,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 7,
  },

  accessoryLabel: {
    fontSize: 8,

    fontWeight: "800",

    letterSpacing: 1.2,

    color: Colors.subtitle,
  },

  accessoryText: {
    flex: 1,

    fontSize: 11,

    lineHeight: 15,

    fontWeight: "600",

    color: Colors.text,
  },

  bottom: {
    marginTop: 18,

    paddingTop: 15,

    borderTopWidth: 1,

    borderTopColor: Colors.border,
  },

  reasonContainer: {
    flex: 1,
  },

  reasonLabel: {
    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.8,

    color: Colors.subtitle,

    marginBottom: 5,
  },

  reason: {
    fontSize: 13,

    lineHeight: 18,

    color: Colors.text,

    fontWeight: "500",
  },
});
