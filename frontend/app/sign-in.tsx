import { Button } from "@/components";
import { setEmail, setPassword, useSignInMutation } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setLanguage } from "@/locale/i18n";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { email, password } = useAppSelector((state) => state.auth);

  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);

  const [login, { isLoading }] = useSignInMutation();

  const selectedLanguage = i18n.language;
  const availableLanguages = [
    { locale: "en", name: "English", flag: require("@/assets/flags/us.svg") },
    {
      locale: "id",
      name: "Indonesian",
      flag: require("@/assets/flags/id.svg"),
    },
    {
      locale: "sundanese",
      name: "Sundanese",
      flag: require("@/assets/flags/xx.svg"),
    },
    {
      locale: "ar",
      name: "Arabic",
      flag: require("@/assets/flags/sa.svg"),
    },
    {
      locale: "he",
      name: "Hebrew",
      flag: require("@/assets/flags/il.svg"),
    },
    {
      locale: "ur",
      name: "Urdu",
      flag: require("@/assets/flags/pk.svg"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("@/assets/images/background-3.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        blurRadius={10}
      />

      <View style={{ height: insets.top }} />

      {availableLanguages
        .filter((value) => value.locale === selectedLanguage)
        .map((value) => (
          <Button
            key={value.locale}
            style={styles.btnOpenModal}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                fontFamily: "LexendRegular",
                color: "white",
                marginHorizontal: 10,
              }}
            >
              {value.locale.toUpperCase()}
            </Text>
            <Image source={value.flag} style={{ width: 20, height: 15 }} />
          </Button>
        ))}

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitle}>
              <Text style={{ fontFamily: "LexendRegular" }}>
                {t("change-language")}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <Button
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <MCIcons name="close-circle-outline" size={24} color={"black"} />
            </Button>
          </View>

          <View style={styles.modalContent}>
            {availableLanguages.map((lang) => (
              <Button
                key={lang.locale}
                onPress={() => setLanguage(lang.locale)}
                style={{
                  ...styles.btnFlag,
                  backgroundColor:
                    lang.locale == selectedLanguage ? "#0000001a" : "white",
                }}
              >
                <Image source={lang.flag} style={{ width: 20, height: 15 }} />
                <Text
                  style={{
                    fontFamily: "LexendRegular",
                    marginHorizontal: 10,
                  }}
                >
                  {lang.name}
                </Text>
                <View style={{ flex: 1 }} />
                {lang.locale == selectedLanguage && (
                  <MCIcons name="check" size={20} color={"black"} />
                )}
              </Button>
            ))}
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              maxWidth: 520,
              width: "85%",
              alignSelf: "center",
              paddingBottom: insets.top + insets.bottom + 50,
            }}
          >
            <Text style={styles.textTitle}>{t("sign-in")}</Text>

            <Text style={{ fontFamily: "LexendBold", color: "white" }}>
              Email
            </Text>
            <View style={styles.viewInputForm}>
              <MCIcons name="email" size={25} color={"white"} />
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={t("form-placeholder-email")}
                onChangeText={(input) => dispatch(setEmail(input))}
                style={styles.inputForm}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={{ height: 15 }} />
            <Text style={{ fontFamily: "LexendBold", color: "white" }}>
              Password
            </Text>
            <View style={styles.viewInputForm}>
              <MCIcons name="lock" size={25} color={"white"} />
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={t("form-placeholder-password")}
                onChangeText={(input) => dispatch(setPassword(input))}
                style={styles.inputForm}
                autoCapitalize="none"
              />
            </View>

            <View style={{ height: 20 }} />
            <Button
              onPress={() => {
                login({ email, password });
              }}
              style={styles.btnSignIn}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.textSignIn}>{t("sign-in")}</Text>
              )}
            </Button>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSignIn: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textSignIn: {
    fontFamily: "LexendBold",
  },
  inputForm: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    color: "white",
  },
  viewInputForm: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  textTitle: {
    fontFamily: "LexendBold",
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  btnOpenModal: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 25,
  },
  btnFlag: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50 / 2,
  },
  modalTitle: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderRadius: 50 / 2,
  },
  modalHeader: {
    flexDirection: "row",
    width: "85%",
    marginBottom: 10,
    maxWidth: 480,
  },
  buttonClose: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 20,
    maxWidth: 480,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
  },
  container: {},
});
