import type { DesignVariant } from "@/constants/theme";

export type ThemeMode = "light" | "dark" | "system";

export type AppSettingsState = {
  theme: ThemeMode;
  language: string | null;
  design: DesignVariant;
};
