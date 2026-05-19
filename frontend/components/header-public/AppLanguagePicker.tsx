import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { useEffect, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { setLanguage } from "@/locale/i18n";
import ButtonLanguage from "./ButtonLanguage";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AppLanguagePicker() {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const languages = [
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

  const progress = useSharedValue(0);
  const [modalMounted, setModalMounted] = useState(false);

  useEffect(() => {
    if (!modalMounted) return;

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 180,
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
      { translateY: (1 - progress.value) * 18 },
      { scale: 0.985 + progress.value * 0.015 },
    ],
  }));

  return (
    <View>
      {languages
        .filter((value) => value.locale === selectedLanguage)
        .map((value) => (
          <Button
            key={value.locale}
            style={styles.btnOpenModal}
            onPress={openModal}
          >
            <Text style={styles.textLocale}>{value.locale.toUpperCase()}</Text>
            <Image source={value.flag} style={{ width: 20, height: 15 }} />
          </Button>
        ))}

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

          <Animated.View style={[styles.modalContent, contentStyle]}>
            {languages.map((lang) => (
              <ButtonLanguage
                key={lang.locale}
                onPress={() => setLanguage(lang.locale)}
                flag={lang.flag}
                label={lang.name}
                selected={lang.locale === selectedLanguage}
              />
            ))}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btnFlag: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50 / 2,
  },
  modalContent: {
    backgroundColor: "rgb(30, 31, 36)",
    width: "80%",
    maxWidth: 420,
    borderRadius: 50 / 2,
    elevation: 3,
    padding: 20,
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
  textLocale: {
    color: "rgb(172, 193, 210)",
  },
  btnOpenModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 20,
  },
});
