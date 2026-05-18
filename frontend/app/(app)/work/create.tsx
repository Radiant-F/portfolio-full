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
import { useCreateWorkMutation } from "@/features/work";
import { Button, FormInput, ImagePickerInput } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type FormValues = { title: string; description: string; sortOrder: string };

export default function WorkCreate() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [createWork, { isLoading }] = useCreateWorkMutation();
  const [iconUri, setIconUri] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", sortOrder: "0" },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("sortOrder", values.sortOrder);
    if (iconFile) formData.append("icon", iconFile as any);
    await createWork(formData).unwrap();
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
                {t("cms.work.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.create")}
            </Text>

            <ImagePickerInput
              label="Icon"
              value={iconUri}
              onChange={(uri, file) => {
                setIconUri(uri);
                setIconFile(file);
              }}
            />

            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.work.title")}
                  value={value}
                  onChangeText={onChange}
                  error={errors.title ? t("cms.work.title") : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.work.description")}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  error={
                    errors.description ? t("cms.work.description") : undefined
                  }
                />
              )}
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
