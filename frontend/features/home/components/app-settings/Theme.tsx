import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ButtonCustom } from "@/components";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";
import { useAppDispatch, useAppSelector, usePublicTheme } from "@/hooks";
import {
  setPublicThemeAccentColor,
  setPublicThemeMode,
  type PublicThemeMode,
} from "@/features/home/services/publicThemeSlice";
import { PUBLIC_THEME_SWATCHES } from "@/features/home/theme/publicTheme";
import { useTranslation } from "react-i18next";

type ThemeModeOption = "dark" | "auto" | "light";

const MODE_MAP: Record<ThemeModeOption, PublicThemeMode> = {
  dark: "dark",
  light: "light",
  auto: "system",
};

const INVERSE_MODE_MAP: Record<PublicThemeMode, ThemeModeOption> = {
  dark: "dark",
  light: "light",
  system: "auto",
};

function normalizeHex(value: string | null) {
  if (!value) return null;
  const hex = value.trim().replace("#", "").toUpperCase();
  if (hex.length === 3) {
    return `#${hex
      .split("")
      .map((char) => `${char}${char}`)
      .join("")}`;
  }
  if (hex.length === 6) {
    return `#${hex}`;
  }
  return null;
}

export default function Theme() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.publicTheme.mode);
  const selectedAccent = useAppSelector(
    (state) => state.publicTheme.accentColor,
  );
  const theme = usePublicTheme();
  const { t } = useTranslation();

  const selectedMode = INVERSE_MODE_MAP[themeMode];
  const normalizedAccent = normalizeHex(selectedAccent);

  const backgroundColor = (mode: ThemeModeOption) =>
    selectedMode === mode ? theme.accentSoft : undefined;
  const textColor = (mode: ThemeModeOption) =>
    selectedMode === mode ? theme.accentContrastText : theme.textSecondary;
  const iconColor = (mode: ThemeModeOption) =>
    selectedMode === mode ? theme.accentContrastText : theme.textSecondary;

  const onSelectColor = ({ hex }: { hex: string }) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    dispatch(setPublicThemeAccentColor(normalized));
  };

  const [openColorPicker, setOpenColorPicker] = useState(false);

  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ color: theme.textSecondary }}>{t("settings.theme-mode")}</Text>
        <View style={{ ...styles.viewMode, borderColor: theme.borderStrong }}>
          <ButtonCustom
            style={{
              ...styles.btnMode,
              backgroundColor: backgroundColor("dark"),
            }}
            onPress={() => dispatch(setPublicThemeMode(MODE_MAP.dark))}
          >
            <MCIcons name="weather-night" color={iconColor("dark")} size={20} />
            <Text style={{ color: textColor("dark") }}>{t("settings.mode-dark")}</Text>
          </ButtonCustom>
          <ButtonCustom
            style={{
              ...styles.btnMode,
              backgroundColor: backgroundColor("auto"),
            }}
            onPress={() => dispatch(setPublicThemeMode(MODE_MAP.auto))}
          >
            <MCIcons name="monitor" color={iconColor("auto")} size={20} />
            <Text style={{ color: textColor("auto") }}>{t("settings.mode-auto")}</Text>
          </ButtonCustom>
          <ButtonCustom
            style={{
              ...styles.btnMode,
              backgroundColor: backgroundColor("light"),
            }}
            onPress={() => dispatch(setPublicThemeMode(MODE_MAP.light))}
          >
            <MCIcons
              name="weather-sunny"
              color={iconColor("light")}
              size={20}
            />
            <Text style={{ color: textColor("light") }}>{t("settings.mode-light")}</Text>
          </ButtonCustom>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ color: theme.textSecondary }}>{t("settings.theme-color")}</Text>
        <View style={styles.viewSwatch}>
          {PUBLIC_THEME_SWATCHES.map((swatch) => {
            const swatchHex = normalizeHex(swatch.value);
            const isSelected = swatchHex
              ? swatchHex === normalizedAccent
              : normalizedAccent === null;

            return (
              <ButtonCustom
                key={swatch.label}
                style={{
                  ...styles.btnSwatch,
                  backgroundColor:
                    swatch.value ?? (theme.isDark ? "#9ED5FF" : "#1F6FB4"),
                  borderColor: isSelected
                    ? theme.accentContrastText
                    : "transparent",
                  borderWidth: isSelected ? 2 : 0,
                }}
                onPress={() =>
                  dispatch(setPublicThemeAccentColor(swatch.value))
                }
              >
                <Text
                  style={{
                    color: swatch.value ? "#0F1E32" : theme.accentForeground,
                    fontWeight: isSelected ? "700" : "500",
                  }}
                >
                  {t(`settings.swatch-${swatch.label.toLowerCase()}`)}
                </Text>
              </ButtonCustom>
            );
          })}
          <ButtonCustom
            onPress={() => setOpenColorPicker(!openColorPicker)}
            style={{
              ...styles.btnSwatch,
              backgroundColor: theme.buttonSecondaryBackground,
              borderWidth: openColorPicker ? 2 : 0,
              borderColor: openColorPicker
                ? theme.accentContrastText
                : "transparent",
            }}
          >
            <Text style={{ color: theme.buttonSecondaryText }}>{t("settings.swatch-custom")}</Text>
          </ButtonCustom>
        </View>

        {openColorPicker && (
          <ColorPicker
            style={{
              paddingHorizontal: 20,
              width: "100%",
              alignSelf: "center",
              gap: 10,
            }}
            thumbSize={20}
            thumbShape="circle"
            value={selectedAccent ?? theme.accent}
            onComplete={onSelectColor}
          >
            <Panel1 />
            <HueSlider />
          </ColorPicker>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewSwatch: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  btnSwatch: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 50 / 2,
    elevation: 3,
  },
  viewMode: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 50 / 2,
    overflow: "hidden",
  },
  btnMode: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
    paddingRight: 17.5,
    gap: 5,
    borderRadius: 50 / 2,
  },
});
