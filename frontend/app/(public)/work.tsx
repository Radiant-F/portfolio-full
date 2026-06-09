import { ButtonCustom, ModalCustom, WorkTag } from "@/components";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function Work() {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const [modalMounted, setModalMounted] = useState(false);

  function openModal() {
    setModalMounted(true);
  }

  function closeModal() {
    setModalMounted(false);
  }

  const [selectedWorkScreenshotIndex, setSelectedWorkScreenshotIndex] =
    useState(8);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: bottomInset,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.textTitle}>
            <Text style={{ color: "rgb(158, 213, 255)" }}>Personal</Text> and{" "}
            <Text style={{ color: "rgb(158, 213, 255)" }}>team</Text>
          </Text>
          <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
            Click for more details.
          </Text>
        </View>

        <View style={styles.containerItem}>
          {[...Array(6).keys()].map((v) => {
            const WORK_TAGS = [
              ...Array(Math.floor(Math.random() * 4) + 3).keys(),
            ];

            return (
              <ButtonCustom key={v} style={styles.btn} onPress={openModal}>
                <Image
                  source={require("@/assets/images/qing/7.png")}
                  style={{ width: 125, height: 125 }}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    padding: 15,
                    gap: 10,
                  }}
                >
                  <Text style={styles.textWorkName} numberOfLines={1}>
                    Work Name
                  </Text>
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

      <ModalCustom
        visible={modalMounted}
        onClose={closeModal}
        title="A Long Work Name"
        customHeaderInfoStart={
          <Image
            source={require("@/assets/images/qing/7.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        }
      >
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
              <Text selectable={false} style={{ color: "rgb(172, 193, 210)" }}>
                Prev
              </Text>
            </ButtonCustom>
            <Text style={{ color: "rgb(172, 193, 210)" }}>
              {selectedWorkScreenshotIndex + 1}/{WORK_SCREENSHOT.length}
            </Text>
            <ButtonCustom
              style={{ ...styles.btnPagination, paddingLeft: 20 }}
              onPress={() =>
                setSelectedWorkScreenshotIndex(
                  selectedWorkScreenshotIndex != WORK_SCREENSHOT.length - 1
                    ? selectedWorkScreenshotIndex + 1
                    : 0,
                )
              }
            >
              <Text selectable={false} style={{ color: "rgb(172, 193, 210)" }}>
                Next
              </Text>
              <MCIcons
                name="chevron-right"
                color={"rgb(172, 193, 210)"}
                size={25}
              />
            </ButtonCustom>
          </View>
          <Text style={{ color: "rgb(172, 193, 210)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            dignissimos illo assumenda dolorem voluptas soluta omnis expedita
            iusto magni dolore harum, eveniet quisquam eius et ab, illum
            accusamus id facere!
          </Text>
          <View style={styles.viewWorkSocial}>
            <ButtonCustom style={styles.btnWorkSocial}>
              <MCIcons name="github" color={"rgb(224, 242, 255)"} size={25} />
              <Text style={{ color: "rgb(224, 242, 255)" }}>GitHub</Text>
            </ButtonCustom>
            <ButtonCustom style={styles.btnWorkSocial}>
              <MCIcons
                name="google-play"
                color={"rgb(224, 242, 255)"}
                size={25}
              />
              <Text style={{ color: "rgb(224, 242, 255)" }}>Play Store</Text>
            </ButtonCustom>
            <ButtonCustom style={styles.btnWorkSocial}>
              <MCIcons name="apple" color={"rgb(224, 242, 255)"} size={25} />
              <Text style={{ color: "rgb(224, 242, 255)" }}>App Store</Text>
            </ButtonCustom>
            <ButtonCustom style={styles.btnWorkSocial}>
              <MCIcons name="web" color={"rgb(224, 242, 255)"} size={25} />
              <Text style={{ color: "rgb(224, 242, 255)" }}>Website</Text>
            </ButtonCustom>
          </View>
          <View style={styles.viewTags}>
            {WORK_TAGS.map((v, i) => {
              return <WorkTag key={v} name={getRandomTagName()} />;
            })}
          </View>
        </View>
      </ModalCustom>
    </>
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
  viewTag: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "tomato",
    // height: "100%",
    // flex: 1,
    gap: 5,
    alignItems: "center",
    // width: 140,
    // justifyContent: "space-evenly",
  },
  textWorkName: {
    color: "rgb(224, 242, 255)",
    fontWeight: "bold",
    // padding: 15,
  },
  btn: {
    backgroundColor: "rgb(39, 48, 58)",
    elevation: 3,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    maxHeight: 125,
    width: 125 + 175,
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
  },
});
