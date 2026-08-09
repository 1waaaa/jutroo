import {
  Modal,
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useEffect, useRef } from "react";

import { Colors } from "../../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ visible, onClose, children }: Props) {
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 500,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

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
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}
          >
            <View style={styles.handle} />

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

    backgroundColor: "rgba(36,52,71,0.35)",
  },

  keyboardContainer: {
    width: "100%",
  },

  sheet: {
    backgroundColor: Colors.surface,

    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,

    paddingHorizontal: 24,

    paddingTop: 12,

    maxHeight: "92%",

    minHeight: "55%",
  },

  handle: {
    width: 55,

    height: 5,

    backgroundColor: Colors.border,

    borderRadius: 999,

    alignSelf: "center",

    marginBottom: 24,
  },

  content: {
    paddingBottom: 30,
  },
});
