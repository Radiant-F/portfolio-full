import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import Button from "../Button";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AdminForm from "./AdminForm";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AppSettings() {
  const [modalMounted, setModalMounted] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!modalMounted) return;

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
  }, [modalMounted, progress]);

  function openModal() {
    setModalMounted(true);
  }

  function closeModal() {
    progress.value = withTiming(
      0,
      {
        duration: 180,
        easing: Easing.in(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(setModalMounted)(false);
        }
      },
    );
  }

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.5,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * 10 },
      { scale: 0.98 + progress.value * 0.02 },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * 10 },
      { scale: 0.95 + progress.value * 0.05 },
    ],
  }));

  return (
    <View>
      <Button style={styles.btnDrawer} onPress={openModal}>
        <MCIcons name="cog" color={"rgb(172, 193, 210)"} size={20} />
      </Button>

      <Modal
        animationType="none"
        visible={modalMounted}
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <AnimatedPressable
            style={[styles.modalBackdrop, backdropStyle]}
            onPress={closeModal}
          />

          <Animated.View style={[styles.modalHeader, headerStyle]}>
            <View style={styles.modalHeaderTitle}>
              <Text style={{ color: "rgb(175, 211, 244)", fontWeight: "bold" }}>
                Settings
              </Text>
            </View>

            <Button style={styles.btnCloseModal} onPress={closeModal}>
              <MCIcons
                name="close-circle-outline"
                color={"rgb(172, 193, 210)"}
                size={20}
              />
            </Button>
          </Animated.View>

          <View style={{ height: 10 }} />

          <Animated.View style={[styles.modalContent, contentStyle]}>
            <ScrollView contentContainerStyle={{ padding: 25 }}>
              <AdminForm />
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btnDrawer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCloseModal: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    backgroundColor: "rgb(30, 31, 36)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderTitle: {
    backgroundColor: "rgb(30, 31, 36)",
    height: 50,
    borderRadius: 50 / 2,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  modalHeader: {
    flexDirection: "row",
    width: "80%",
    maxWidth: 420,
    justifyContent: "space-between",
  },
  modalContent: {
    backgroundColor: "rgb(30, 31, 36)",
    width: "80%",
    maxWidth: 420,
    borderRadius: 50 / 2,
    elevation: 3,
    maxHeight: 480,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
});
