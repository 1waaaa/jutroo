import { Pressable, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

import { Colors } from "../../theme/colors";

interface Props {
  title: string;
  subtitle?: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function CTAActionCard({
  title,
  subtitle,
  buttonTitle,
  onPress,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.gloss}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>
            {subtitle ??
              "Tell us what you need to accomplish today and we'll build the smartest schedule."}
          </Text>

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title={buttonTitle}
              onPress={onPress}
              disabled={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 50,

    borderRadius: 26,

    padding: 1,

    backgroundColor: "rgba(255,255,255,0.72)",
  },

  gloss: {
    borderRadius: 25,

    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.48)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.68)",

    shadowColor: Colors.ink,

    shadowOpacity: 0.07,

    shadowRadius: 22,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 4,
  },

  content: {
    paddingHorizontal: 20,

    paddingTop: 24,

    paddingBottom: 20,

    alignItems: "center",
  },

  title: {
    fontSize: 21,

    fontWeight: "800",

    letterSpacing: -0.5,

    color: Colors.text,

    textAlign: "center",
  },

  subtitle: {
    maxWidth: 310,

    marginTop: 7,

    marginBottom: 19,

    fontSize: 14,

    lineHeight: 21,

    fontWeight: "500",

    color: Colors.subtitle,

    textAlign: "center",
  },

  buttonWrapper: {
    width: "100%",
  },
});
