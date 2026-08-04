import { Modal, View, Pressable, StyleSheet, Animated } from "react-native";
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
    <Modal visible={visible} transparent animationType="none">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.handle} />

          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(36,52,71,0.35)",
  },

  sheet: {
    backgroundColor: Colors.surface,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    padding: 24,

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
});
