import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { setLanguage } from "@/locale/i18n";
import { LANGUAGES } from "@/constants/language";
import { ButtonCustom, Flags, ModalCustom } from "@/components";
import ButtonLanguage from "./ButtonLanguage";
import { usePublicTheme } from "@/hooks";

export default function LanguagePicker() {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const theme = usePublicTheme();

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
            <Text style={{ color: theme.textSecondary }}>
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
