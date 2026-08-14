import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ArrowUpRight, Check, Gem } from "lucide-react-native";

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

  const images = [
    generated.top,
    generated.bottom,
    generated.shoes,
    generated.outerwear,
    ...generated.accessories,
  ].filter(Boolean);

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

      {/* OUTFIT IMAGES */}

      {images.length > 0 && (
        <View style={styles.look}>
          {images.slice(0, 4).map((item, index) => {
            if (!item) {
              return null;
            }

            return (
              <View
                key={`${item.id}-${index}`}
                style={[
                  styles.imageWrapper,
                  index > 0 && styles.overlap,
                  {
                    zIndex: images.length - index,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            );
          })}
        </View>
      )}

      {/* ACCESSORIES */}

      {generated.accessories.length > 0 && (
        <View style={styles.accessories}>
          <View style={styles.accessoryHeader}>
            <View style={styles.accessoryIcon}>
              <Gem size={16} color={Colors.ink} strokeWidth={1.7} />
            </View>

            <Text style={styles.accessoryLabel}>ACCESSORIES</Text>
          </View>

          <View style={styles.accessoryImages}>
            {generated.accessories.slice(0, 3).map((accessory) => (
              <Image
                key={accessory.id}
                source={{ uri: accessory.image }}
                style={styles.accessoryImage}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
      )}

      {/* WHY THIS LOOK */}

      <View style={styles.bottom}>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>WHY THIS LOOK</Text>

          <Text style={styles.reason}>{outfit.reason}</Text>
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

    alignItems: "center",

    marginTop: 22,

    paddingLeft: 4,

    minHeight: 112,
  },

  imageWrapper: {
    width: 104,

    height: 112,

    borderRadius: 24,

    backgroundColor: Colors.ivory,

    padding: 3,

    borderWidth: 1,

    borderColor: Colors.border,

    shadowColor: Colors.ink,

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,

      height: 6,
    },

    elevation: 3,
  },

  overlap: {
    marginLeft: -34,
  },

  image: {
    width: "100%",

    height: "100%",

    borderRadius: 21,

    backgroundColor: Colors.mist,
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

    marginRight: 10,
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

  accessoryImages: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    flex: 1,
  },

  accessoryImage: {
    width: 34,

    height: 34,

    borderRadius: 10,

    backgroundColor: Colors.surface,
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

    lineHeight: 19,

    color: Colors.text,

    fontWeight: "500",
  },
});
