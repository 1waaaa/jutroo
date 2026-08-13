import {
  Modal,
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PanResponder,
} from "react-native";

import { useEffect, useRef } from "react";

import { Colors } from "../../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ visible, onClose, children }: Props) {
  const translateY = useRef(new Animated.Value(600)).current;

  const currentTranslateY = useRef(0);

  useEffect(() => {
    if (visible) {
      currentTranslateY.current = 0;

      Animated.spring(translateY, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 600,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return gesture.dy > 5 && Math.abs(gesture.dy) > Math.abs(gesture.dx);
      },

      onPanResponderGrant: () => {
        currentTranslateY.current = 0;
      },

      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        const shouldClose = gesture.dy > 120 || gesture.vy > 1.2;

        if (shouldClose) {
          currentTranslateY.current = 600;

          Animated.timing(translateY, {
            toValue: 600,
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });

          return;
        }

        currentTranslateY.current = 0;

        Animated.spring(translateY, {
          toValue: 0,
          damping: 24,
          stiffness: 220,
          mass: 0.8,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View style={styles.dragArea} {...panResponder.panHandlers}>
              <View style={styles.handle} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.content}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "flex-end",

    backgroundColor: Colors.overlay,
  },

  keyboardContainer: {
    width: "100%",
  },

  sheet: {
    backgroundColor: Colors.surface,

    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,

    paddingHorizontal: 24,

    paddingTop: 0,

    maxHeight: "92%",

    minHeight: "55%",

    overflow: "hidden",
  },

  dragArea: {
    height: 48,

    justifyContent: "center",

    alignItems: "center",
  },

  handle: {
    width: 55,

    height: 5,

    backgroundColor: Colors.handle,

    borderRadius: 999,
  },

  content: {
    paddingTop: 4,

    paddingBottom: 30,
  },
});
