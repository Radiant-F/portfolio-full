import {
  ButtonCustom,
  ErrorIndicator,
  LoadingIndicator,
  ModalCustom,
} from "@/components";
import { LocaleType } from "@/constants/language";
import { useGetExperiencesQuery } from "@/features/experience";
import { ExperienceResponse } from "@/features/experience/experience";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Experience() {
  const { isError, isFetching, isSuccess, data, refetch } =
    useGetExperiencesQuery(null);
  const { i18n, t } = useTranslation();

  const { bottom: bottomInset } = useSafeAreaInsets();
  const [modalMounted, setModalMounted] = useState(false);
  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).split(
    "-",
  )[0] as LocaleType;

  const [selectedExp, setSelectedExp] = useState<ExperienceResponse | null>(
    null,
  );

  function openModal(exp: ExperienceResponse) {
    setModalMounted(true);
    setSelectedExp(exp);
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
          {isFetching && <LoadingIndicator />}
          {isError && <ErrorIndicator onPressRefresh={refetch} />}
          {isSuccess &&
            data.map((v) => (
              <ButtonCustom
                key={v.id}
                style={styles.btn}
                onPress={() => openModal(v)}
              >
                <Image
                  source={{ uri: v.companyLogoUrl }}
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
                    {v.companyTitle}
                  </Text>
                  <Text
                    style={styles.textCompanyRole}
                    selectable={false}
                    numberOfLines={1}
                  >
                    {v.position}
                  </Text>
                </View>
              </ButtonCustom>
            ))}
        </View>
      </ScrollView>

      <ModalCustom
        visible={modalMounted}
        onClose={closeModal}
        title={selectedExp?.position}
        iconHeaderInfoStart="briefcase"
      >
        {selectedExp && (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "rgb(172, 193, 210)", textAlign: "center" }}>
              {new Date(selectedExp.startDate).toLocaleDateString()} -{" "}
              {selectedExp.endDate
                ? new Date(selectedExp.endDate).toLocaleDateString()
                : t("public.experience.present")}
            </Text>

            <View style={{ height: 20 }} />

            <View style={{ alignSelf: "flex-start", gap: 2.5 }}>
              <Text
                style={{ color: "rgb(158, 213, 255)", paddingHorizontal: 5 }}
              >
                {t("public.experience.responsibility-title")}
              </Text>
              <View style={{ height: 1, backgroundColor: "rgb(55, 62, 78)" }} />
            </View>
            <View style={{ padding: 10, gap: 5 }}>
              <View style={styles.impact}>
                <Text style={{ color: "rgb(172, 193, 210)" }}>
                  {selectedExp.responsibilityI18n?.[activeLanguage] ??
                    selectedExp.responsibilityI18n?.en ??
                    selectedExp.responsibility}
                </Text>
              </View>
            </View>

            <View style={{ alignSelf: "flex-start", gap: 2.5 }}>
              <Text
                style={{ color: "rgb(158, 213, 255)", paddingHorizontal: 5 }}
              >
                {t("public.experience.achievements-title")}
              </Text>
              <View style={{ height: 1, backgroundColor: "rgb(55, 62, 78)" }} />
            </View>
            <View style={{ padding: 10, gap: 5 }}>
              {selectedExp.achievements.map((v) => {
                return (
                  <View key={v.id} style={styles.impact}>
                    <Text style={{ color: "rgb(172, 193, 210)" }}>
                      {v.descriptionI18n?.[activeLanguage] ??
                        v.descriptionI18n?.en ??
                        v.description}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
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
