import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useCreateExperienceMutation } from "@/features/experience";
import { Button, FormInput, ImagePickerInput, DateInput } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type FormValues = {
  companyTitle: string;
  position: string;
  responsibility: string;
  sortOrder: string;
};

export default function ExperienceCreate() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [createExperience, { isLoading }] = useCreateExperienceMutation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      companyTitle: "",
      position: "",
      responsibility: "",
      sortOrder: "0",
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("companyTitle", values.companyTitle);
    formData.append("position", values.position);
    formData.append("responsibility", values.responsibility);
    formData.append("sortOrder", values.sortOrder);
    if (startDate) formData.append("startDate", startDate.toISOString());
    if (endDate) formData.append("endDate", endDate.toISOString());
    if (imageFile) formData.append("image", imageFile as any);
    await createExperience(formData).unwrap();
    router.back();
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.duration(300)}>
            <Button
              onPress={() => router.back()}
              style={[styles.backBtn, { backgroundColor: colors.surfaceAlt }]}
            >
              <MCIcons
                name="arrow-left"
                size={18}
                color={colors.textSecondary}
              />
              <Text style={[styles.backText, { color: colors.textSecondary }]}>
                {t("cms.experience.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.create")}
            </Text>

            <ImagePickerInput
              label={t("cms.experience.company") + " Logo"}
              value={imageUri}
              onChange={(uri, file) => {
                setImageUri(uri);
                setImageFile(file);
              }}
            />

            <Controller
              control={control}
              name="companyTitle"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.experience.company")}
                  value={value}
                  onChangeText={onChange}
                  error={
                    errors.companyTitle
                      ? t("cms.experience.company")
                      : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="position"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.experience.position")}
                  value={value}
                  onChangeText={onChange}
                  error={
                    errors.position ? t("cms.experience.position") : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="responsibility"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.experience.responsibility")}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  error={
                    errors.responsibility
                      ? t("cms.experience.responsibility")
                      : undefined
                  }
                />
              )}
            />

            <DateInput
              label={t("cms.experience.start-date")}
              value={startDate}
              onChange={setStartDate}
              maximumDate={new Date()}
            />

            <DateInput
              label={t("cms.experience.end-date")}
              value={endDate}
              onChange={setEndDate}
              nullable
              nullLabel={t("cms.experience.present")}
              maximumDate={new Date()}
            />

            <Controller
              control={control}
              name="sortOrder"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.sort-order")}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: isLoading
                    ? colors.surfaceAlt
                    : colors.primary,
                },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.primaryForeground} />
              ) : (
                <Text
                  style={[
                    styles.saveBtnText,
                    { color: colors.primaryForeground },
                  ]}
                >
                  {t("cms.create")}
                </Text>
              )}
            </Button>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backText: { fontFamily: "LexendRegular", fontSize: 14 },
  pageTitle: { fontSize: 22, fontFamily: "LexendBold", marginBottom: 20 },
  saveBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  saveBtnText: { fontFamily: "LexendBold", fontSize: 15 },
});
