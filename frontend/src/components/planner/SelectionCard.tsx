import { Pressable, StyleSheet, Text, View } from "react-native";
import { LucideIcon } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  selected: boolean;
  onPress: () => void;
}

export default function SelectionCard({
  title,
  subtitle,
  icon: Icon,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected && styles.selectedContainer,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[styles.iconContainer, selected && styles.selectedIconContainer]}
      >
        <Icon
          size={25}
          strokeWidth={1.9}
          color={selected ? Colors.ink : Colors.subtitle}
        />
      </View>

      <Text style={[styles.title, selected && styles.selectedText]}>
        {title}
      </Text>

      {subtitle && (
        <Text style={[styles.subtitle, selected && styles.selectedSubtitle]}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 108,
    backgroundColor: Colors.surface,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  selectedContainer: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },

  pressed: {
    transform: [{ scale: 0.97 }],
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: Colors.mist,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },

  selectedIconContainer: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.ink,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 4,
    color: Colors.subtitle,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },

  selectedText: {
    color: Colors.ivory,
  },

  selectedSubtitle: {
    color: "rgba(252,250,246,0.65)",
  },
});
