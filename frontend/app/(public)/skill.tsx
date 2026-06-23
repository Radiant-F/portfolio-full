import {
  ButtonCustom,
  ErrorIndicator,
  LoadingIndicator,
  ModalCustom,
} from "@/components";
import { LocaleType } from "@/constants/language";
import { useGetSkillsQuery } from "@/features/skill";
import { SkillResponse } from "@/features/skill/skill";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePublicTheme } from "@/hooks";

export default function Skill() {
  const { isError, isFetching, isSuccess, data, refetch } =
    useGetSkillsQuery(null);
  const { i18n, t } = useTranslation();
  const theme = usePublicTheme();
  const [selectedSkill, setSelectedSkill] = useState<SkillResponse | null>(
    null,
  );

  const { bottom: bottomInset } = useSafeAreaInsets();

  const [modalMounted, setModalMounted] = useState(false);
  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).split(
    "-",
  )[0] as LocaleType;

  function openModal(skill: SkillResponse) {
    setModalMounted(true);
    setSelectedSkill(skill);
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
          <Text style={{ ...styles.textTitle, color: theme.text }}>
            {t("public.skill.title-prefix")}{" "}
            <Text style={{ color: theme.accentContrastText }}>
              {t("public.skill.title-highlight-hard")}
            </Text>{" "}
            {t("public.skill.title-middle")}{" "}
            <Text style={{ color: theme.accentContrastText }}>
              {t("public.skill.title-highlight-soft")}
            </Text>{" "}
            {t("public.skill.title-suffix")}
          </Text>
          <Text style={{ color: theme.textSecondary, textAlign: "center" }}>
            {t("public.common.open-details")}
          </Text>
        </View>

        <View style={styles.containerItem}>
          {isFetching && <LoadingIndicator />}
          {true && <ErrorIndicator onPressRefresh={refetch} />}
          {isSuccess &&
            data.map((v) => {
              return (
                <ButtonCustom
                  key={v.id}
                  style={{
                    ...styles.btn,
                    backgroundColor: theme.buttonSecondaryBackground,
                  }}
                  onPress={() => openModal(v)}
                >
                  <Image
                    source={{ uri: v.imageUrl }}
                    style={styles.img}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                  <Text
                    selectable={false}
                    style={{ ...styles.textSkillName, color: theme.text }}
                  >
                    {v.title}
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
        title={selectedSkill?.title ?? "Skill Title"}
        customHeaderInfoStart={
          selectedSkill && (
            <Image
              source={{ uri: selectedSkill.imageUrl }}
              style={{ width: "50%", height: "50%" }}
              resizeMethod="resize"
              resizeMode="contain"
            />
          )
        }
      >
        <View style={{ padding: 20 }}>
          {selectedSkill && selectedSkill.details.length == 0 && (
            <Text
              style={{
                color: theme.textSecondary,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              {t("public.skill.modal-intro-empty")}
            </Text>
          )}
          {selectedSkill && selectedSkill.details.length != 0 && (
            <>
              <Text style={{ color: theme.textSecondary }}>
                {t("public.skill.modal-intro")}
              </Text>
              <View style={{ gap: 20, marginTop: 20 }}>
                {selectedSkill.details.map((v) => (
                  <View key={v.id} style={{ gap: 5 }}>
                    <View style={{ alignSelf: "flex-start", gap: 2.5 }}>
                      <Text
                        style={{
                          color: theme.accentContrastText,
                          paddingHorizontal: 5,
                          fontWeight: "bold",
                        }}
                      >
                        {v.name}
                      </Text>
                      <View
                        style={{ height: 1, backgroundColor: theme.border }}
                      />
                    </View>
                    <Text
                      style={{
                        color: theme.textSecondary,
                        paddingHorizontal: 5,
                      }}
                    >
                      {v.descriptionI18n?.[activeLanguage] ??
                        v.descriptionI18n?.en ??
                        v.description}
                    </Text>
                    <View
                      style={{ height: 1, backgroundColor: theme.border }}
                    />
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  textSkillName: {
    fontWeight: "500",
  },
  containerItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingVertical: 10,
    gap: 10,
    paddingRight: 25,
    borderRadius: 20,
  },
  img: {
    width: 50,
    height: 50,
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 27,
  },
  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
});
