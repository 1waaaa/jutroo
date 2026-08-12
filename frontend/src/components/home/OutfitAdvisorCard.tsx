import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowUpRight } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  onPress: () => void;
}

export default function OutfitAdvisorCard({ onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>STYLE FOR TODAY</Text>

          <View style={styles.arrow}>
            <ArrowUpRight size={19} color={Colors.text} strokeWidth={2.2} />
          </View>
        </View>

        <Text style={styles.title}>What are you{"\n"}wearing today?</Text>

        <Text style={styles.subtitle}>
          Let AI create a look around your plans,
          {"\n"}
          the weather and your personal style.
        </Text>

        <View style={styles.action}>
          <Text style={styles.actionText}>Create my outfit</Text>
        </View>
      </View>

      <View style={styles.glow} />
      <View style={styles.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",

    overflow: "hidden",

    marginBottom: 28,

    borderRadius: 30,

    backgroundColor: Colors.ink,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.10)",

    shadowColor: Colors.ink,

    shadowOpacity: 0.16,

    shadowRadius: 24,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 6,
  },

  pressed: {
    transform: [{ scale: 0.985 }],

    opacity: 0.94,
  },

  content: {
    padding: 22,

    zIndex: 2,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  eyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2.2,

    color: "rgba(252,250,246,0.62)",
  },

  arrow: {
    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.10)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",

    justifyContent: "center",

    alignItems: "center",
  },

  title: {
    marginTop: 30,

    fontSize: 30,

    lineHeight: 34,

    fontWeight: "800",

    letterSpacing: -0.9,

    color: Colors.ivory,
  },

  subtitle: {
    marginTop: 12,

    fontSize: 14,

    lineHeight: 21,

    color: "rgba(252,250,246,0.68)",
  },

  action: {
    alignSelf: "flex-start",

    flexDirection: "row",

    alignItems: "center",

    gap: 7,

    marginTop: 22,

    paddingHorizontal: 16,

    height: 44,

    borderRadius: 22,

    backgroundColor: Colors.coral,
  },

  actionText: {
    fontSize: 14,

    fontWeight: "800",

    color: Colors.ivory,
  },

  glow: {
    position: "absolute",

    width: 210,

    height: 210,

    borderRadius: 105,

    right: -70,

    bottom: -110,

    backgroundColor: "rgba(232,196,119,0.16)",
  },

  accent: {
    position: "absolute",

    width: 120,

    height: 120,

    borderRadius: 60,

    right: -45,

    top: -45,

    backgroundColor: "rgba(217,130,114,0.12)",
  },
});
