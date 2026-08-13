import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckCircle2, ChevronRight, LucideIcon } from "lucide-react-native";

import { ConfiguredActivity } from "../../../constants/activities";
import { Colors } from "../../../theme/colors";

interface Props {
  icon: LucideIcon;
  title: string;
  configuration?: ConfiguredActivity;
  onPress: () => void;
}

export default function ActivityCard({
  icon: Icon,
  title,
  configuration,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        configuration && styles.configuredCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.iconContainer,
            configuration && styles.configuredIconContainer,
          ]}
        >
          <Icon
            size={23}
            strokeWidth={1.9}
            color={configuration ? Colors.ink : Colors.subtitle}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>

          {configuration ? (
            <View style={styles.configuration}>
              <Text style={styles.subtitle}>{configuration.duration} min</Text>

              <View style={styles.dot} />

              <Text style={styles.subtitle}>
                {configuration.fixed
                  ? `${configuration.earliest} – ${configuration.latest}`
                  : "Flexible"}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholder}>Tap to configure</Text>
          )}
        </View>
      </View>

      <View style={styles.right}>
        {configuration && (
          <CheckCircle2 size={21} color={Colors.success} strokeWidth={2.2} />
        )}

        <ChevronRight size={20} color={Colors.handle} strokeWidth={2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  configuredCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: Colors.mist,
  },

  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: Colors.mist,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  configuredIconContainer: {
    backgroundColor: Colors.waterLight,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
    color: Colors.ink,
  },

  configuration: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.subtitle,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.handle,
    marginHorizontal: 7,
  },

  placeholder: {
    marginTop: 5,
    fontSize: 13,
    color: Colors.subtitle,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginLeft: 10,
  },
});
