import { useTranslation } from "react-i18next";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { setLanguage } from "@/locale/i18n";
import { LANGUAGES } from "@/constants/language";
import { ButtonCustom, Flags, ModalCustom } from "@/components";
import ButtonLanguage from "./ButtonLanguage";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

export default function LanguagePicker() {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const [modalMounted, setModalMounted] = useState(false);

  function openModal() {
    setModalMounted(true);
  }
  function closeModal() {
    setModalMounted(false);
  }

  return (
    <View>
      {LANGUAGES.filter((value) => value.locale === selectedLanguage).map(
        (value) => (
          <ButtonCustom
            key={value.locale}
            style={styles.btnOpenModal}
            onPress={openModal}
          >
            <Text style={{ color: "rgb(172, 193, 210)" }}>
              {value.locale.toUpperCase()}
            </Text>
            <Flags locale={value.locale} />
          </ButtonCustom>
        ),
      )}

      <ModalCustom
        visible={modalMounted}
        showHeader={false}
        onClose={closeModal}
        maxWidth={420}
      >
        <View style={{ padding: 20 }}>
          {LANGUAGES.map((lang) => (
            <ButtonLanguage
              key={lang.locale}
              onPress={() => setLanguage(lang.locale)}
              locale={lang.locale}
              label={lang.label}
              selected={lang.locale === selectedLanguage}
            />
          ))}
          <View style={{ height: 10 }} />
          <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
            Powered by{" "}
            <Pressable
              onPress={async () => {
                try {
                  await Linking.openURL("https://docs.libretranslate.com/");
                } catch (error) {
                  alert(
                    `Cannot open url. Error detail: ${JSON.stringify(error)}`,
                  );
                }
              }}
            >
              <Text
                style={{ textDecorationLine: "underline", fontWeight: "bold" }}
              >
                <MCIcons
                  color={"rgb(172, 193, 210)"}
                  name="open-in-new"
                  size={13}
                />{" "}
                LibreTranslate
              </Text>
            </Pressable>
            . English is much prefered.
          </Text>
        </View>
      </ModalCustom>
    </View>
  );
}

const styles = StyleSheet.create({
  btnOpenModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 20,
  },
});
