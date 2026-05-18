import { useColorScheme } from "react-native";
import { useAppSelector } from "@/hooks/redux";
import {
  ColorScheme,
  DEFAULT_DESIGN,
  getDesignDefinition,
  type CmsDesignDefinition,
  type MotionTokens,
  type RadiusTokens,
  type SpacingTokens,
  type TypographyTokens,
} from "@/constants/theme";

export type Theme = {
  design: CmsDesignDefinition;
  colors: ColorScheme;
  isDark: boolean;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  typography: TypographyTokens;
  motion: MotionTokens;
  themeMode: "light" | "dark" | "system";
  resolvedMode: "light" | "dark";
};

export function useTheme(): Theme {
  const themeMode = useAppSelector((state) => state.appSettings.theme);
  const selectedDesign = useAppSelector(
    (state) => state.appSettings.design ?? DEFAULT_DESIGN,
  );
  const systemColorScheme = useColorScheme();

  const isDark =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  const design = getDesignDefinition(selectedDesign);

  return {
    design,
    colors: isDark ? design.colors.dark : design.colors.light,
    isDark,
    spacing: design.spacing,
    radius: design.radius,
    typography: design.typography,
    motion: design.motion,
    themeMode,
    resolvedMode: isDark ? "dark" : "light",
  };
}
