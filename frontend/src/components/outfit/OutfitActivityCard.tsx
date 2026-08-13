import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";

import { Colors } from "../../theme/colors";
import { OUTFIT_ACTIVITY_ICONS } from "../../constants/outfitIcons";

interface Props {
  activityId: string;
  title: string;
  selected: boolean;
  onPress: () => void;
}

export default function OutfitActivityCard({
  activityId,
  title,
  selected,
  onPress,
}: Props) {
  const Icon = OUTFIT_ACTIVITY_ICONS[activityId];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selectedCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconContainer,
            selected && styles.selectedIconContainer,
          ]}
        >
          {Icon && (
            <Icon
              size={23}
              color={selected ? Colors.text : Colors.ink}
              strokeWidth={1.7}
            />
          )}
        </View>

        <View style={[styles.check, selected && styles.checkSelected]}>
          {selected && (
            <Check size={13} color={Colors.text} strokeWidth={2.8} />
          )}
        </View>
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.caption}>
          {selected ? "Ready to style" : "Explore looks"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 132,

    padding: 16,

    borderRadius: 26,

    backgroundColor: Colors.surface,

    borderWidth: 1,
    borderColor: Colors.border,

    justifyContent: "space-between",

    marginBottom: 12,
  },

  selectedCard: {
    backgroundColor: Colors.ivory,

    borderColor: "rgba(232,196,119,0.65)",

    shadowColor: Colors.champagne,
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 3,
  },

  pressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.92,
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: 17,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",
  },

  selectedIconContainer: {
    backgroundColor: Colors.champagne,
  },

  check: {
    width: 24,
    height: 24,

    borderRadius: 12,

    borderWidth: 1.5,
    borderColor: Colors.border,

    justifyContent: "center",
    alignItems: "center",
  },

  checkSelected: {
    backgroundColor: Colors.success,

    borderColor: Colors.success,
  },

  title: {
    fontSize: 18,

    fontWeight: "800",

    color: Colors.text,

    letterSpacing: -0.35,

    marginTop: 18,
  },

  caption: {
    fontSize: 11,

    fontWeight: "600",

    color: Colors.subtitle,

    marginTop: 4,

    letterSpacing: 0.1,
  },
});
