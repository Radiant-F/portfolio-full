import { ButtonCustom, WorkTag } from "@/components";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

const WORK_SCREENSHOT: ImageSourcePropType[] = [
  require("@/assets/images/qing/1.png"),
  require("@/assets/images/qing/4.png"),
  require("@/assets/images/qing/5.png"),
  require("@/assets/images/qing/7.png"),
  require("@/assets/images/qing/8.png"),
  require("@/assets/images/qing/2.png"),
  require("@/assets/images/qing/3.png"),
  require("@/assets/images/qing/6.png"),
  require("@/assets/images/qing.png"),
];

const WORK_TAGS = [...Array(Math.floor(Math.random() * 4) + 3).keys()];

const TAG_NAMES = [
  "Android",
  "iOS",
  "Web",
  "React Native",
  "React Native Expo",
  "Play Store",
  "Firebase",
  "Laravel",
  "MongoDB",
] as const;

function getRandomTagName() {
  return TAG_NAMES[Math.floor(Math.random() * TAG_NAMES.length)];
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Work() {
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

  const [selectedWorkScreenshotIndex, setSelectedWorkScreenshotIndex] =
    useState(8);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ padding: 20 }}>
          <Text style={styles.textTitle}>
            <Text style={{ color: "rgb(158, 213, 255)" }}>Cool</Text> stuff
            ahead
          </Text>
          <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
            Click for more details.
          </Text>
        </View>

        <View style={styles.containerItem}>
          {[...Array(6).keys()].map((v) => {
            return (
              <ButtonCustom key={v} style={styles.btn} onPress={openModal}>
                <Image
                  source={require("@/assets/images/qing/7.png")}
                  style={{ width: 150, height: 150 }}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
                <View style={{ padding: 20, flex: 1, gap: 20 }}>
                  <Text style={styles.textWorkName}>Work Name</Text>
                  <View style={styles.viewTag}>
                    {WORK_TAGS.slice(0, 4).map((v) => {
                      return (
                        <WorkTag
                          showName={false}
                          key={v}
                          name={getRandomTagName()}
                        />
                      );
                    })}
                    {WORK_TAGS.length > 4 && (
                      <Text style={{ color: "rgb(158, 213, 255)" }}>
                        +{WORK_TAGS.length - 4} more
                      </Text>
                    )}
                  </View>
                </View>
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
                  source={require("@/assets/images/qing/7.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              </View>
              <View style={styles.modalHeaderTitle}>
                <Text
                  style={{ color: "rgb(175, 211, 244)", fontWeight: "bold" }}
                >
                  Work Name • Personal • 2025
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
            <ScrollView>
              <View style={{ width: "100%", height: 280 }}>
                <Image
                  source={WORK_SCREENSHOT[selectedWorkScreenshotIndex]}
                  style={styles.imgWorkScBackdrop}
                  resizeMethod="resize"
                  resizeMode="cover"
                  blurRadius={5}
                />
                <Image
                  source={WORK_SCREENSHOT[selectedWorkScreenshotIndex]}
                  style={styles.imgWorkSc}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              </View>

              <View style={{ padding: 20, gap: 20 }}>
                <View style={styles.viewPagination}>
                  <ButtonCustom
                    style={{ ...styles.btnPagination, paddingRight: 20 }}
                    onPress={() =>
                      setSelectedWorkScreenshotIndex(
                        selectedWorkScreenshotIndex != 0
                          ? selectedWorkScreenshotIndex - 1
                          : 0,
                      )
                    }
                  >
                    <MCIcons
                      name="chevron-left"
                      color={"rgb(172, 193, 210)"}
                      size={25}
                    />
                    <Text style={{ color: "rgb(172, 193, 210)" }}>Prev</Text>
                  </ButtonCustom>
                  <Text style={{ color: "rgb(172, 193, 210)" }}>
                    {selectedWorkScreenshotIndex + 1}/{WORK_SCREENSHOT.length}
                  </Text>
                  <ButtonCustom
                    style={{ ...styles.btnPagination, paddingLeft: 20 }}
                    onPress={() =>
                      setSelectedWorkScreenshotIndex(
                        selectedWorkScreenshotIndex !=
                          WORK_SCREENSHOT.length - 1
                          ? selectedWorkScreenshotIndex + 1
                          : 0,
                      )
                    }
                  >
                    <Text style={{ color: "rgb(172, 193, 210)" }}>Next</Text>
                    <MCIcons
                      name="chevron-right"
                      color={"rgb(172, 193, 210)"}
                      size={25}
                    />
                  </ButtonCustom>
                </View>
                <Text style={{ color: "rgb(172, 193, 210)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime dignissimos illo assumenda dolorem voluptas soluta
                  omnis expedita iusto magni dolore harum, eveniet quisquam eius
                  et ab, illum accusamus id facere!
                </Text>
                <View style={styles.viewWorkSocial}>
                  <ButtonCustom style={styles.btnWorkSocial}>
                    <MCIcons
                      name="github"
                      color={"rgb(224, 242, 255)"}
                      size={25}
                    />
                    <Text style={{ color: "rgb(224, 242, 255)" }}>GitHub</Text>
                  </ButtonCustom>
                  <ButtonCustom style={styles.btnWorkSocial}>
                    <MCIcons
                      name="google-play"
                      color={"rgb(224, 242, 255)"}
                      size={25}
                    />
                    <Text style={{ color: "rgb(224, 242, 255)" }}>
                      Play Store
                    </Text>
                  </ButtonCustom>
                  <ButtonCustom style={styles.btnWorkSocial}>
                    <MCIcons
                      name="apple"
                      color={"rgb(224, 242, 255)"}
                      size={25}
                    />
                    <Text style={{ color: "rgb(224, 242, 255)" }}>
                      App Store
                    </Text>
                  </ButtonCustom>
                  <ButtonCustom style={styles.btnWorkSocial}>
                    <MCIcons
                      name="web"
                      color={"rgb(224, 242, 255)"}
                      size={25}
                    />
                    <Text style={{ color: "rgb(224, 242, 255)" }}>Website</Text>
                  </ButtonCustom>
                </View>
                <View style={styles.viewTags}>
                  {WORK_TAGS.map((v, i) => {
                    return <WorkTag key={v} name={getRandomTagName()} />;
                  })}
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewWorkSocial: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnWorkSocial: {
    backgroundColor: "rgb(39, 48, 58)",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 5,
    paddingHorizontal: 20,
  },
  viewTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "center",
  },
  btnPagination: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(39, 48, 58)",
    borderRadius: 40 / 2,
    elevation: 3,
    flexDirection: "row",
    gap: 2.5,
    paddingHorizontal: 10,
  },
  viewPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "aqua",
  },
  imgWorkScBackdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.25,
  },
  imgWorkSc: {
    width: "100%",
    height: "100%",
  },
  btnCloseModal: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    backgroundColor: "rgb(30, 31, 36)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
    maxWidth: 580,
    justifyContent: "space-between",
  },
  modalContent: {
    backgroundColor: "rgb(30, 31, 36)",
    width: "80%",
    maxWidth: 580,
    borderRadius: 50 / 2,
    elevation: 3,
    maxHeight: 600,
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
  viewTag: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    alignItems: "center",
    width: 135,
  },
  textWorkName: {
    color: "rgb(224, 242, 255)",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "rgb(39, 48, 58)",
    elevation: 3,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    maxWidth: 325,
    maxHeight: 150,
  },
  containerItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
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
