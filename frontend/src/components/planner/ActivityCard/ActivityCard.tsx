import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckCircle2, ChevronRight } from "lucide-react-native";

import { ConfiguredActivity } from "../../../constants/activities";
import { Colors } from "../../../theme/colors";

interface Props {
  emoji: string;

  title: string;

  configuration?: ConfiguredActivity;

  onPress: () => void;
}

export default function ActivityCard({
  emoji,
  title,
  configuration,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{emoji}</Text>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>

          {configuration ? (
            <>
              <Text style={styles.subtitle}>{configuration.duration} min</Text>

              <Text style={styles.subtitle}>
                {configuration.fixed
                  ? `${configuration.earliest} – ${configuration.latest}`
                  : "Flexible"}
              </Text>
            </>
          ) : (
            <Text style={styles.placeholder}>Tap to configure</Text>
          )}
        </View>
      </View>

      <View style={styles.right}>
        {configuration && (
          <CheckCircle2 size={22} color="#32C671" style={styles.check} />
        )}

        <ChevronRight size={20} color={Colors.subtitle} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    borderRadius: 22,

    padding: 18,

    marginBottom: 14,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderWidth: 1,

    borderColor: Colors.border,
  },

  left: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  emoji: {
    fontSize: 34,

    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.text,
  },

  subtitle: {
    marginTop: 3,

    fontSize: 14,

    color: Colors.subtitle,
  },

  placeholder: {
    marginTop: 4,

    fontSize: 14,

    color: Colors.subtitle,

    fontStyle: "italic",
  },

  right: {
    alignItems: "center",

    justifyContent: "center",

    gap: 8,
  },

  check: {
    marginBottom: 6,
  },
});
