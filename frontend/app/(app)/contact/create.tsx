import React from "react";
import {
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
import { useCreateContactMutation } from "@/features/contact";
import { Button, FormInput } from "@/components";
import { useTheme } from "@/hooks";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

type FormValues = {
  platform: string;
  title: string;
  url: string;
  sortOrder: string;
};

export default function ContactCreate() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [createContact, { isLoading }] = useCreateContactMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { platform: "", title: "", url: "", sortOrder: "0" },
  });

  async function onSubmit(values: FormValues) {
    await createContact({
      platform: values.platform,
      title: values.title,
      url: values.url,
      sortOrder: Number(values.sortOrder),
    }).unwrap();
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
                {t("cms.contact.title")}
              </Text>
            </Button>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.create")}
            </Text>

            <Controller
              control={control}
              name="platform"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.contact.platform")}
                  value={value}
                  onChangeText={onChange}
                  placeholder="GitHub, LinkedIn, Twitter..."
                  error={
                    errors.platform ? t("cms.contact.platform") : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.contact.link-title")}
                  value={value}
                  onChangeText={onChange}
                  placeholder="My GitHub Profile"
                  error={errors.title ? t("cms.contact.link-title") : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="url"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label={t("cms.contact.url")}
                  value={value}
                  onChangeText={onChange}
                  placeholder="https://..."
                  keyboardType="url"
                  autoCapitalize="none"
                  error={errors.url ? t("cms.contact.url") : undefined}
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
              <Text
                style={[
                  styles.saveBtnText,
                  {
                    color: isLoading
                      ? colors.textMuted
                      : colors.primaryForeground,
                  },
                ]}
              >
                {isLoading ? t("cms.saving") : t("cms.create")}
              </Text>
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
