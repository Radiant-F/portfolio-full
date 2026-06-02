import { ButtonCustom } from "@/components";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Skill() {
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ padding: 20 }}>
          <Text style={styles.textTitle}>
            Gained from{" "}
            <Text style={{ color: "rgb(158, 213, 255)" }}>hard</Text> skills and{" "}
            <Text style={{ color: "rgb(158, 213, 255)" }}>soft</Text> skills
          </Text>
          <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
            Click for more details.
          </Text>
        </View>

        <View style={styles.containerItem}>
          {[...Array(20).keys()].map((v) => {
            return (
              <ButtonCustom key={v} style={styles.btn} onPress={openModal}>
                <Image
                  source={require("@/assets/images/firebase.png")}
                  style={styles.img}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
                <Text selectable={false} style={styles.textSkillName}>
                  React Native CLI
                </Text>
              </ButtonCustom>
            );
          })}
        </View>
      </ScrollView>

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
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={styles.btnCloseModal}>
                <Image
                  source={require("@/assets/images/firebase.png")}
                  style={{ width: "50%", height: "50%" }}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              </View>
              <View style={styles.modalHeaderTitle}>
                <Text
                  style={{ color: "rgb(175, 211, 244)", fontWeight: "bold" }}
                >
                  React Native CLI
                </Text>
              </View>
            </View>

            <ButtonCustom style={styles.btnCloseModal} onPress={closeModal}>
              <MCIcons
                name="close-circle-outline"
                color={"rgb(172, 193, 210)"}
                size={20}
              />
            </ButtonCustom>
          </Animated.View>

          <View style={{ height: 10 }} />

          <Animated.View style={[styles.modalContent, contentStyle]}>
            <ScrollView contentContainerStyle={{ padding: 25, gap: 20 }}>
              <Text style={{ color: "rgb(224, 242, 255)" }}>
                With this skill, I managed to do:
              </Text>
              {[...Array(7).keys()].map((v) => (
                <View key={v} style={styles.viewDetail}>
                  <View style={{ alignSelf: "flex-start", gap: 2.5 }}>
                    <Text
                      style={{
                        color: "rgb(158, 213, 255)",
                        paddingHorizontal: 5,
                      }}
                    >
                      Detail Title
                    </Text>
                    <View
                      style={{ height: 1, backgroundColor: "rgb(55, 62, 78)" }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "rgb(224, 242, 255)",
                      paddingHorizontal: 5,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum, itaque, molestias rem velit sequi animi magni aliquam
                    cumque maxime minus nam labore natus sed earum omnis,
                    reiciendis aspernatur nostrum eveniet.
                  </Text>
                  <View
                    style={{ height: 1, backgroundColor: "rgb(55, 62, 78)" }}
                  />
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewDetail: {
    // borderWidth: 1,
    // borderColor: "rgb(55, 62, 78)",
    // borderRadius: 25,
    // padding: 20,
    gap: 5,
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
  textSkillName: {
    color: "rgb(224, 242, 255)",
    fontWeight: "500",
  },
  containerItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    backgroundColor: "rgb(39, 48, 58)",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingVertical: 10,
    gap: 5,
    paddingRight: 25,
    borderRadius: 20,
  },
  img: {
    width: 50,
    height: 50,
  },
  textTitle: {
    fontWeight: "bold",
    color: "rgb(224, 242, 255)",
    textAlign: "center",
    fontSize: 27,
  },
  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    flex: 1,
  },
});
