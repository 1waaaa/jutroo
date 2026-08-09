import { Pressable, StyleSheet, Text, View } from "react-native";

import { Shirt, ChevronRight } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  onPress: () => void;
}

export default function OutfitAdvisorCard({ onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Shirt size={28} color={Colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Need outfit advice?</Text>

        <Text style={styles.title}>OUTFIT ADVISOR</Text>

        <Text style={styles.subtitle}>
          Let AI choose what to wear based on your plans and today's weather.
        </Text>
      </View>

      <ChevronRight size={22} color={Colors.subtitle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 20,

    marginBottom: 22,

    borderWidth: 1,

    borderColor: "#EEF2F7",

    gap: 14,
  },

  iconContainer: {
    width: 54,

    height: 54,

    borderRadius: 18,

    backgroundColor: "#F1F7FF",

    justifyContent: "center",

    alignItems: "center",
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 13,

    color: Colors.subtitle,

    marginBottom: 4,
  },

  title: {
    fontSize: 18,

    fontWeight: "800",

    color: Colors.text,
  },

  subtitle: {
    fontSize: 13,

    lineHeight: 18,

    color: Colors.subtitle,

    marginTop: 4,
  },
});
