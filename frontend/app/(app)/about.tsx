import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { marked } from "marked";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useGetAboutQuery, useUpdateAboutMutation } from "@/features/about";
import { Button, MarkdownEditor } from "@/components";
import { useTheme } from "@/hooks";

type FormValues = {
  content: string;
};

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<em>(.*?)<\/em>/gi, "*$1*")
    .replace(
      /<h([1-6])>(.*?)<\/h[1-6]>/gi,
      (_, level, text) => "#".repeat(Number(level)) + " " + text,
    )
    .replace(/<a href="(.*?)".*?>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

export default function AboutCMS() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { data, isLoading } = useGetAboutQuery(null);
  const [updateAbout, { isLoading: isSaving }] = useUpdateAboutMutation();
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ defaultValues: { content: "" } });

  useEffect(() => {
    if (data?.content) {
      reset({ content: htmlToMarkdown(data.content) });
    }
  }, [data]);

  async function onSubmit({ content }: FormValues) {
    try {
      const html = await marked(content);
      await updateAbout({ content: html }).unwrap();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (_) {}
  }

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
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
          contentContainerStyle={[
            styles.scroll,
            { backgroundColor: colors.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.duration(300)}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              {t("cms.about.title")}
            </Text>

            <Controller
              control={control}
              name="content"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <MarkdownEditor
                  value={value}
                  onChange={onChange}
                  label={t("cms.about.content")}
                  placeholder={t("cms.about.content-hint")}
                  error={errors.content ? t("cms.about.no-content") : undefined}
                  minHeight={280}
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isSaving || !isDirty}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: saved
                    ? colors.success
                    : isSaving || !isDirty
                      ? colors.surfaceAlt
                      : colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.saveBtnText,
                  {
                    color:
                      isSaving || !isDirty
                        ? colors.textMuted
                        : colors.primaryForeground,
                  },
                ]}
              >
                {isSaving ? t("cms.saving") : saved ? "✓ Saved" : t("cms.save")}
              </Text>
            </Button>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scroll: { padding: 20, paddingBottom: 40 },
  pageTitle: {
    fontSize: 22,
    fontFamily: "LexendBold",
    marginBottom: 20,
  },
  saveBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtnText: {
    fontFamily: "LexendBold",
    fontSize: 15,
  },
});
