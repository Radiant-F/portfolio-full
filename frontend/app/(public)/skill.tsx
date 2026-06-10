import { ButtonCustom, ModalCustom } from "@/components";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Skill() {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [modalMounted, setModalMounted] = useState(false);

  function openModal() {
    setModalMounted(true);
  }

  function closeModal() {
    setModalMounted(false);
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: bottomInset + 20,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.textTitle}>
            <Text style={{ color: "rgb(158, 213, 255)" }}>Hard</Text> skills and{" "}
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

      <ModalCustom
        visible={modalMounted}
        onClose={closeModal}
        maxWidth={420}
        maxContentHeight={480}
        title="React Native CLI"
        customHeaderInfoStart={
          <Image
            source={require("@/assets/images/firebase.png")}
            style={{ width: "50%", height: "50%" }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        }
      >
        <View style={{ padding: 20 }}>
          <Text style={{ color: "rgb(224, 242, 255)" }}>
            With this skill, I managed to do:
          </Text>
          <View style={{ gap: 20, marginTop: 20 }}>
            {[...Array(7).keys()].map((v) => (
              <View key={v} style={{ gap: 5 }}>
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
                  style={{ color: "rgb(224, 242, 255)", paddingHorizontal: 5 }}
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
          </View>
        </View>
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  textSkillName: {
    color: "rgb(224, 242, 255)",
    fontWeight: "500",
  },
  containerItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
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
  },
});
