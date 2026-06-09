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
          paddingBottom: bottomInset,
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

        <ButtonCustom style={styles.btn} onPress={openModal}>
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

          <View style={styles.content}>
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
  content: {
    gap: 10,
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
