import { ButtonCustom, ModalCustom } from "@/components";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Experience() {
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
        <View style={{ gap: 20, padding: 20 }}>
          {[...Array(7).keys()].map((v) => (
            <ButtonCustom key={v} style={styles.btn} onPress={openModal}>
              <Image
                source={require("@/assets/images/firebase-full.png")}
                style={{ width: 150, height: 50 }}
                resizeMethod="resize"
                resizeMode="contain"
              />
              <View style={styles.line} />
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.textCompanyName}
                  selectable={false}
                  numberOfLines={1}
                >
                  Google
                </Text>
                <Text
                  style={styles.textCompanyRole}
                  selectable={false}
                  numberOfLines={1}
                >
                  Developer Developer Developer Developer Developer
                </Text>
              </View>
            </ButtonCustom>
          ))}
        </View>
      </ScrollView>

      <ModalCustom
        visible={modalMounted}
        onClose={closeModal}
        title="Developer Developer Developer Developer Developer"
        iconHeaderInfoStart="briefcase"
      >
        <View style={{ padding: 20 }}>
          <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
            Jan 2025 - Present
          </Text>

          <View style={{ height: 20 }} />

          <View style={{ alignSelf: "flex-start", gap: 2.5 }}>
            <Text style={{ color: "rgb(158, 213, 255)", paddingHorizontal: 5 }}>
              What I do:
            </Text>
            <View style={{ height: 1, backgroundColor: "rgb(55, 62, 78)" }} />
          </View>
          <View style={{ padding: 10, gap: 5 }}>
            <View style={styles.impact}>
              <Text style={{ color: "rgb(172, 193, 210)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia debitis sunt iure. Quis unde dolores quo tenetur
                maxime, similique labore esse id iure harum expedita eligendi
                vitae eius voluptate consequatur.
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "flex-start", gap: 2.5 }}>
            <Text style={{ color: "rgb(158, 213, 255)", paddingHorizontal: 5 }}>
              What I achieve:
            </Text>
            <View style={{ height: 1, backgroundColor: "rgb(55, 62, 78)" }} />
          </View>
          <View style={{ padding: 10, gap: 5 }}>
            {[...Array(10).keys()].map((v) => {
              return (
                <View key={v} style={styles.impact}>
                  <Text style={{ color: "rgb(172, 193, 210)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia debitis sunt iure. Quis unde dolores quo tenetur
                    maxime, similique labore esse id iure harum expedita
                    eligendi vitae eius voluptate consequatur.
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  impact: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(55, 62, 78)",
    paddingBottom: 10,
  },
  textCompanyRole: {
    color: "rgb(172, 193, 210)",
  },
  textCompanyName: {
    color: "rgb(224, 242, 255)",
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
  },
  line: {
    backgroundColor: "rgb(55, 62, 78)",
    width: 1,
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: "rgb(39, 48, 58)",
    flexDirection: "row",
    padding: 20,
    elevation: 3,
    borderRadius: 20,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
  textTitle: {
    fontWeight: "bold",
    color: "rgb(224, 242, 255)",
    textAlign: "center",
    fontSize: 27,
  },
});
