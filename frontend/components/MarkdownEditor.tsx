import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { marked } from "marked";
import { useTheme } from "@/hooks";
import { useTranslation } from "react-i18next";
import Button from "./Button";

type MarkdownEditorProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  minHeight?: number;
};

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
  error,
  label,
  minHeight = 200,
}: MarkdownEditorProps) {
  const { colors, radius, typography, design } = useTheme();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  const htmlContent = React.useMemo(() => {
    if (!value) return "<p></p>";
    return marked(value) as string;
  }, [value]);

  const tagsStyles = {
    body: { color: colors.text, fontFamily: typography.body, fontSize: 15 },
    p: { marginTop: 0, marginBottom: 8 },
    strong: { fontFamily: typography.bodyBold },
    a: { color: colors.primary },
    code: {
      backgroundColor: colors.surfaceAlt,
      color: colors.text,
      borderRadius: 4,
      padding: 2,
    },
    blockquote: {
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      paddingLeft: 12,
      marginLeft: 0,
      color: colors.textSecondary,
    },
  };

  return (
    <View style={{ marginBottom: 16 }}>
      {label ? (
        <Text
          style={{
            fontSize: 13,
            fontFamily: typography.body,
            color: error ? colors.error : colors.textSecondary,
            marginBottom: 6,
            letterSpacing: typography.eyebrowSpacing * 0.1,
          }}
        >
          {label}
        </Text>
      ) : null}

      {/* Tab toggle */}
      <View
        style={[
          styles.tabRow,
          {
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.border,
            borderRadius: radius.md,
          },
        ]}
      >
        {(["edit", "preview"] as const).map((t_) => (
          <Button
            key={t_}
            onPress={() => setTab(t_)}
            style={[
              styles.tabBtn,
              { borderRadius: radius.sm },
              tab === t_ && {
                backgroundColor: colors.card,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: tab === t_ ? typography.bodyBold : typography.body,
                fontSize: 13,
                color: tab === t_ ? colors.primary : colors.textSecondary,
              }}
            >
              {t_ === "edit" ? t("cms.edit") : t("cms.preview")}
            </Text>
          </Button>
        ))}
      </View>

      {/* Content area */}
      <View
        style={[
          styles.contentArea,
          {
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.error : colors.inputBorder,
            minHeight,
            borderRadius: radius.md,
            borderWidth: Math.max(1.25, design.chrome.borderWeight),
          },
        ]}
      >
        {tab === "edit" ? (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder ?? t("cms.about.content-hint")}
            placeholderTextColor={colors.textMuted}
            multiline
            textAlignVertical="top"
            style={{
              color: colors.text,
              fontFamily: typography.body,
              fontSize: 15,
              flex: 1,
              minHeight,
              lineHeight: 22,
            }}
          />
        ) : (
          <ScrollView>
            {value ? (
              <RenderHtml
                contentWidth={width - 64}
                source={{ html: htmlContent }}
                tagsStyles={tagsStyles as any}
                baseStyle={{ backgroundColor: "transparent" }}
              />
            ) : (
              <Text
                style={{
                  color: colors.textMuted,
                  fontFamily: typography.body,
                  fontSize: 14,
                }}
              >
                {t("cms.about.no-content")}
              </Text>
            )}
          </ScrollView>
        )}
      </View>

      {error ? (
        <Text
          style={{
            fontSize: 12,
            fontFamily: typography.body,
            color: colors.error,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: "row",
    padding: 3,
    marginBottom: 8,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  contentArea: {
    padding: 14,
  },
});
