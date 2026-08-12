import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.spring(scale, {
          toValue: 1,
          damping: 16,
          stiffness: 100,
          mass: 0.8,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 4777);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, opacity, scale, subtitleOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Image
            source={require("../../../assets/logo/jutro-logo-dark.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: subtitleOpacity,
          }}
        >
          <Text style={styles.subtitle}>Plan your day around the weather.</Text>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.bottomMark,
          {
            opacity: subtitleOpacity,
          },
        ]}
      >
        <View style={styles.dot} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.ink,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 30,
  },

  center: {
    alignItems: "center",

    justifyContent: "center",

    width: "100%",
  },

  logoWrapper: {
    width: 280,

    height: 120,

    justifyContent: "center",

    alignItems: "center",
  },

  logo: {
    width: "100%",

    height: "100%",
  },

  subtitle: {
    marginTop: 18,

    fontSize: 15,

    fontWeight: "500",

    letterSpacing: 0.3,

    color: "rgba(252,250,246,0.68)",

    textAlign: "center",
  },

  bottomMark: {
    position: "absolute",

    bottom: 55,

    alignItems: "center",

    justifyContent: "center",
  },

  dot: {
    width: 5,

    height: 5,

    borderRadius: 3,

    backgroundColor: Colors.champagne,
  },
});
