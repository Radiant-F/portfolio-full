import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useAppSelector } from "./redux";
import { buildPublicThemeTokens } from "@/features/home/theme/publicTheme";

export function usePublicTheme() {
  const systemScheme = useColorScheme();
  const normalizedScheme =
    systemScheme === "light" || systemScheme === "dark" ? systemScheme : null;
  const mode = useAppSelector((state) => state.publicTheme.mode);
  const accentColor = useAppSelector((state) => state.publicTheme.accentColor);

  return useMemo(
    () => buildPublicThemeTokens(mode, normalizedScheme, accentColor),
    [accentColor, mode, normalizedScheme],
  );
}
