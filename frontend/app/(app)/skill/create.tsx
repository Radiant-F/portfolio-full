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
import { useCreateSkillMutation } from "@/features/skill";
import { Button, FormInput, ImagePickerInput } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type FormValues = { title: string; sortOrder: string };

export default function SkillCreate() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [createSkill, { isLoading }] = useCreateSkillMutation();
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { title: "", sortOrder: "0" } });

  async function onSubmit(values: FormValues) {
    if (!imageFile) {
      setImageError("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title.trim());
    formData.append("image", imageFile as any);

    const sortOrder = values.sortOrder.trim();
    if (sortOrder.length > 0) {
      formData.append("sortOrder", String(Number(sortOrder)));
    }

    await createSkill(formData).unwrap();
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
                {t("cms.skill.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.create")}
            </Text>

            <ImagePickerInput
              label="Image"
              value={imageUri}
              onChange={(uri, file) => {
                setImageUri(uri);
                setImageFile(file);
                if (file) {
                  setImageError(null);
                }
              }}
            />
            {imageError ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {imageError}
              </Text>
            ) : null}

            <Controller
              control={control}
              name="title"
              rules={{
                required: true,
                validate: (value) => value.trim().length > 0,
              }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.skill.name")}
                  value={value}
                  onChangeText={onChange}
                  placeholder="React Native, TypeScript..."
                  error={errors.title ? t("cms.skill.name") : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="sortOrder"
              rules={{
                validate: (value) =>
                  value.trim().length === 0 || /^-?\d+$/.test(value.trim()),
              }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.sort-order")}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  error={errors.sortOrder ? t("cms.sort-order") : undefined}
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
  errorText: {
    fontFamily: "LexendRegular",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },
  saveBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  saveBtnText: { fontFamily: "LexendBold", fontSize: 15 },
});
