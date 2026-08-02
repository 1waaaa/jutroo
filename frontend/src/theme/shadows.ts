import { ViewStyle } from "react-native";

export const Shadows: Record<string, ViewStyle> = {
  card: {
    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,

      height: 8,
    },

    elevation: 4,
  },
};
