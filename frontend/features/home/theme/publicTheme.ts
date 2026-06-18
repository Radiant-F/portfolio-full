import type { PublicThemeMode } from "../services/publicThemeSlice";

const DEFAULT_DARK_ACCENT = "#9ED5FF";
const DEFAULT_LIGHT_ACCENT = "#1F6FB4";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type BasePalette = {
  background: string;
  header: string;
  drawer: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textMuted: string;
};

export type PublicThemeTokens = {
  mode: PublicThemeMode;
  resolvedMode: "dark" | "light";
  isDark: boolean;
  accent: string;
  accentSoft: string;
  accentSoftStrong: string;
  accentForeground: string;
  accentContrastText: string;
  background: string;
  headerBackground: string;
  drawerBackground: string;
  surface: string;
  surfaceRaised: string;
  surfaceTint: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  buttonSecondaryBackground: string;
  buttonSecondaryText: string;
  overlayBackdrop: string;
  wave: string;
};

const LIGHT_BASE: BasePalette = {
  background: "#F4F7FC",
  header: "#EDF3FB",
  drawer: "#EDF3FB",
  surface: "#FFFFFF",
  surfaceRaised: "#F7FAFF",
  border: "#C5D1DF",
  borderStrong: "#9FB0C3",
  text: "#17263A",
  textSecondary: "#43566D",
  textMuted: "#63768D",
};

const DARK_BASE: BasePalette = {
  background: "#1A191F",
  header: "#1F1F26",
  drawer: "#1F1F26",
  surface: "#1E1F24",
  surfaceRaised: "#27303A",
  border: "#373E4E",
  borderStrong: "#5A677D",
  text: "#E0F2FF",
  textSecondary: "#ACC1D2",
  textMuted: "#8DA5BA",
};

export const PUBLIC_THEME_SWATCHES = [
  { label: "Default", value: null },
  { label: "Sakura", value: "#FFB7C5" },
  { label: "Amethyst", value: "#9966CC" },
  { label: "Rose", value: "#C21E56" },
] as const;

function clamp(value: number, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value));
}

function normalizeHex(hex: string) {
  const raw = hex.replace("#", "").trim();

  if (raw.length === 3) {
    return raw
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }

  if (raw.length === 6) {
    return raw;
  }

  return "000000";
}

function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex);

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(rgb: Rgb) {
  return `#${[rgb.r, rgb.g, rgb.b]
    .map((v) => clamp(v).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mix(hexA: string, hexB: string, ratio: number) {
  const colorA = hexToRgb(hexA);
  const colorB = hexToRgb(hexB);

  return rgbToHex({
    r: Math.round(colorA.r + (colorB.r - colorA.r) * ratio),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * ratio),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * ratio),
  });
}

function alpha(hex: string, opacity: number) {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function chooseReadableText(background: string) {
  const dark = "#0F1E32";
  const light = "#F3F9FF";

  return contrastRatio(dark, background) >= contrastRatio(light, background)
    ? dark
    : light;
}

function ensureContrast(foreground: string, background: string, minimum = 4.5) {
  if (contrastRatio(foreground, background) >= minimum) {
    return foreground;
  }

  const white = "#FFFFFF";
  const black = "#000000";

  let best = foreground;
  let bestRatio = contrastRatio(foreground, background);

  for (let step = 1; step <= 8; step += 1) {
    const ratio = step / 8;
    const towardWhite = mix(foreground, white, ratio);
    const towardBlack = mix(foreground, black, ratio);
    const towardWhiteContrast = contrastRatio(towardWhite, background);
    const towardBlackContrast = contrastRatio(towardBlack, background);

    if (towardWhiteContrast > bestRatio) {
      best = towardWhite;
      bestRatio = towardWhiteContrast;
    }

    if (towardBlackContrast > bestRatio) {
      best = towardBlack;
      bestRatio = towardBlackContrast;
    }

    if (bestRatio >= minimum) {
      return best;
    }
  }

  return best;
}

export function getDefaultAccentByMode(mode: "dark" | "light") {
  return mode === "dark" ? DEFAULT_DARK_ACCENT : DEFAULT_LIGHT_ACCENT;
}

export function buildPublicThemeTokens(
  mode: PublicThemeMode,
  systemScheme: "dark" | "light" | null,
  customAccentColor: string | null,
): PublicThemeTokens {
  const resolvedMode =
    mode === "system" ? (systemScheme === "light" ? "light" : "dark") : mode;
  const isDark = resolvedMode === "dark";
  const base = isDark ? DARK_BASE : LIGHT_BASE;
  const accent = ensureContrast(
    customAccentColor ?? getDefaultAccentByMode(resolvedMode),
    base.background,
    2.8,
  );

  const accentForeground = chooseReadableText(accent);
  const accentContrastText = ensureContrast(accent, base.background, 3);
  const surfaceTint = mix(base.surface, accent, isDark ? 0.14 : 0.1);

  return {
    mode,
    resolvedMode,
    isDark,
    accent,
    accentForeground,
    accentContrastText,
    accentSoft: alpha(accent, isDark ? 0.16 : 0.14),
    accentSoftStrong: alpha(accent, isDark ? 0.32 : 0.26),
    background: base.background,
    headerBackground: base.header,
    drawerBackground: base.drawer,
    surface: base.surface,
    surfaceRaised: base.surfaceRaised,
    surfaceTint,
    border: base.border,
    borderStrong: base.borderStrong,
    text: base.text,
    textSecondary: base.textSecondary,
    textMuted: base.textMuted,
    buttonSecondaryBackground: mix(
      base.surfaceRaised,
      accent,
      isDark ? 0.08 : 0.06,
    ),
    buttonSecondaryText: ensureContrast(
      base.text,
      mix(base.surfaceRaised, accent, 0.06),
      4.5,
    ),
    overlayBackdrop: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(15, 23, 42, 0.42)",
    wave: mix(accent, "#FFFFFF", isDark ? 0.04 : 0.28),
  };
}
