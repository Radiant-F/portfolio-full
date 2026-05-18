import { Platform } from "react-native";

export type DesignVariant =
  | "northstar"
  | "paper"
  | "voltage"
  | "forge"
  | "archive";

export type ColorScheme = {
  background: string;
  surface: string;
  surfaceAlt: string;
  surfaceRaised: string;
  border: string;
  borderStrong: string;
  primary: string;
  primaryForeground: string;
  primaryLight: string;
  accent: string;
  accentForeground: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  error: string;
  errorLight: string;
  success: string;
  warning: string;
  card: string;
  cardBorder: string;
  drawerBackground: string;
  headerBackground: string;
  headerForeground: string;
  inputBackground: string;
  inputBorder: string;
  inputFocusBorder: string;
  overlay: string;
  skeleton: string;
  destructive: string;
  destructiveLight: string;
  heroStart: string;
  heroEnd: string;
  heroGlow: string;
  badgeBackground: string;
  badgeForeground: string;
  chipBackground: string;
  chipForeground: string;
};

export type TypographyTokens = {
  display: string;
  heading: string;
  body: string;
  bodyBold: string;
  mono: string;
  eyebrowSpacing: number;
};

export type SpacingTokens = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  section: number;
};

export type RadiusTokens = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
};

export type MotionTokens = {
  pressScale: number;
  quick: number;
  standard: number;
  slow: number;
};

export type CmsDesignDefinition = {
  key: DesignVariant;
  label: string;
  summary: string;
  icon: string;
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  motion: MotionTokens;
  chrome: {
    borderWeight: number;
    panel: "console" | "editorial" | "studio" | "forge" | "archive";
  };
};

const serifFamily = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
})!;

const monoFamily = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
})!;

const uiTypography: TypographyTokens = {
  display: "LexendBold",
  heading: "LexendBold",
  body: "LexendRegular",
  bodyBold: "LexendBold",
  mono: monoFamily,
  eyebrowSpacing: 1.8,
};

const baseSpacing: SpacingTokens = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  section: 28,
};

const baseRadius: RadiusTokens = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
};

const baseMotion: MotionTokens = {
  pressScale: 0.96,
  quick: 120,
  standard: 190,
  slow: 260,
};

const baseLight: ColorScheme = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceAlt: "#EEF2F7",
  surfaceRaised: "#FFFFFF",
  border: "#D8E0EA",
  borderStrong: "#B6C2D2",
  primary: "#0EA5E9",
  primaryForeground: "#F8FAFC",
  primaryLight: "#E0F2FE",
  accent: "#38BDF8",
  accentForeground: "#082F49",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  error: "#DC2626",
  errorLight: "#FEF2F2",
  success: "#059669",
  warning: "#D97706",
  card: "#FFFFFF",
  cardBorder: "#D8E0EA",
  drawerBackground: "#F3F7FB",
  headerBackground: "rgba(248, 250, 252, 0.92)",
  headerForeground: "#0F172A",
  inputBackground: "#FFFFFF",
  inputBorder: "#B6C2D2",
  inputFocusBorder: "#0EA5E9",
  overlay: "rgba(15, 23, 42, 0.48)",
  skeleton: "#D8E0EA",
  destructive: "#DC2626",
  destructiveLight: "#FEE2E2",
  heroStart: "#F8FAFC",
  heroEnd: "#DCEEFF",
  heroGlow: "rgba(14, 165, 233, 0.18)",
  badgeBackground: "#E0F2FE",
  badgeForeground: "#075985",
  chipBackground: "#EAF5FF",
  chipForeground: "#0C4A6E",
};

const baseDark: ColorScheme = {
  background: "#07111F",
  surface: "#0E1A2B",
  surfaceAlt: "#162336",
  surfaceRaised: "#14263C",
  border: "#1E324B",
  borderStrong: "#2A4868",
  primary: "#38BDF8",
  primaryForeground: "#04131F",
  primaryLight: "#082F49",
  accent: "#7DD3FC",
  accentForeground: "#082F49",
  text: "#E2E8F0",
  textSecondary: "#A8B7CA",
  textMuted: "#6D829B",
  error: "#F87171",
  errorLight: "#450A0A",
  success: "#34D399",
  warning: "#FBBF24",
  card: "#0E1A2B",
  cardBorder: "#1E324B",
  drawerBackground: "#091524",
  headerBackground: "rgba(7, 17, 31, 0.92)",
  headerForeground: "#F8FAFC",
  inputBackground: "#0B1626",
  inputBorder: "#294159",
  inputFocusBorder: "#38BDF8",
  overlay: "rgba(2, 6, 23, 0.72)",
  skeleton: "#1E324B",
  destructive: "#F87171",
  destructiveLight: "#4C1014",
  heroStart: "#091524",
  heroEnd: "#0F2340",
  heroGlow: "rgba(56, 189, 248, 0.22)",
  badgeBackground: "#0C4A6E",
  badgeForeground: "#E0F2FE",
  chipBackground: "#0C2538",
  chipForeground: "#BAE6FD",
};

function createScheme(base: ColorScheme, overrides: Partial<ColorScheme>) {
  return { ...base, ...overrides };
}

function createDesign(
  config: Omit<
    CmsDesignDefinition,
    "colors" | "spacing" | "radius" | "motion"
  > & {
    light: Partial<ColorScheme>;
    dark: Partial<ColorScheme>;
    spacing?: Partial<SpacingTokens>;
    radius?: Partial<RadiusTokens>;
    motion?: Partial<MotionTokens>;
  },
): CmsDesignDefinition {
  return {
    key: config.key,
    label: config.label,
    summary: config.summary,
    icon: config.icon,
    colors: {
      light: createScheme(baseLight, config.light),
      dark: createScheme(baseDark, config.dark),
    },
    typography: config.typography,
    spacing: { ...baseSpacing, ...config.spacing },
    radius: { ...baseRadius, ...config.radius },
    motion: { ...baseMotion, ...config.motion },
    chrome: config.chrome,
  };
}

export const DEFAULT_DESIGN: DesignVariant = "northstar";

export const CMS_DESIGNS: Record<DesignVariant, CmsDesignDefinition> = {
  northstar: createDesign({
    key: "northstar",
    label: "Northstar Console",
    summary: "Cool command center for precise content operations.",
    icon: "radar",
    typography: {
      ...uiTypography,
      display: monoFamily,
      heading: "LexendBold",
      mono: monoFamily,
      eyebrowSpacing: 2.4,
    },
    chrome: {
      borderWeight: 1,
      panel: "console",
    },
    light: {
      primary: "#0284C7",
      accent: "#06B6D4",
      heroStart: "#F7FBFF",
      heroEnd: "#D8EEFF",
      heroGlow: "rgba(2, 132, 199, 0.18)",
      badgeBackground: "#D7F0FF",
      badgeForeground: "#075985",
    },
    dark: {
      background: "#06101B",
      surface: "#0B1727",
      surfaceAlt: "#102033",
      cardBorder: "#1C3652",
      primary: "#22D3EE",
      accent: "#38BDF8",
      heroStart: "#06101B",
      heroEnd: "#0C2139",
      heroGlow: "rgba(34, 211, 238, 0.22)",
      badgeBackground: "#083344",
      badgeForeground: "#A5F3FC",
    },
  }),
  paper: createDesign({
    key: "paper",
    label: "Paper Ledger",
    summary: "Warm editorial surfaces for writing-first workflows.",
    icon: "book-open-page-variant-outline",
    typography: {
      ...uiTypography,
      display: serifFamily,
      heading: serifFamily,
      body: "LexendRegular",
      bodyBold: "LexendBold",
      mono: monoFamily,
      eyebrowSpacing: 1.4,
    },
    spacing: {
      md: 16,
      lg: 20,
      xl: 28,
      section: 32,
    },
    radius: {
      lg: 16,
      xl: 20,
    },
    motion: {
      pressScale: 0.985,
      standard: 210,
      slow: 290,
    },
    chrome: {
      borderWeight: 1,
      panel: "editorial",
    },
    light: {
      background: "#FBF6EE",
      surface: "#FFFDF8",
      surfaceAlt: "#F3E8D8",
      surfaceRaised: "#FFFCF5",
      border: "#DCC9AF",
      borderStrong: "#C9AE85",
      primary: "#A44A1E",
      primaryForeground: "#FFF8F1",
      primaryLight: "#F8E2D2",
      accent: "#D4A448",
      accentForeground: "#5B3A0A",
      text: "#34251A",
      textSecondary: "#6B5744",
      textMuted: "#A08A72",
      success: "#4E6A45",
      warning: "#A86718",
      cardBorder: "#DCC9AF",
      drawerBackground: "#F7EFE2",
      headerBackground: "rgba(251, 246, 238, 0.92)",
      headerForeground: "#34251A",
      inputBackground: "#FFFDF8",
      inputBorder: "#C9AE85",
      inputFocusBorder: "#A44A1E",
      heroStart: "#FFF8ED",
      heroEnd: "#F2E1C7",
      heroGlow: "rgba(164, 74, 30, 0.15)",
      badgeBackground: "#F5E7D5",
      badgeForeground: "#7C451D",
      chipBackground: "#F1E0C8",
      chipForeground: "#6B3F19",
    },
    dark: {
      background: "#251A15",
      surface: "#2F211B",
      surfaceAlt: "#3A2A22",
      surfaceRaised: "#433128",
      border: "#5A4338",
      borderStrong: "#8F6A54",
      primary: "#E18A45",
      primaryForeground: "#2B160D",
      primaryLight: "#5A3420",
      accent: "#E5BE6B",
      accentForeground: "#3A2712",
      text: "#F3E8D8",
      textSecondary: "#D4C0A9",
      textMuted: "#9E846C",
      success: "#8FB07B",
      warning: "#E6A158",
      cardBorder: "#5A4338",
      drawerBackground: "#2A1D17",
      headerBackground: "rgba(37, 26, 21, 0.92)",
      headerForeground: "#FFF7ED",
      inputBackground: "#34251D",
      inputBorder: "#7A5A49",
      inputFocusBorder: "#E18A45",
      heroStart: "#2A1C17",
      heroEnd: "#4A3024",
      heroGlow: "rgba(225, 138, 69, 0.18)",
      badgeBackground: "#5A3420",
      badgeForeground: "#FDE7D1",
      chipBackground: "#4A3024",
      chipForeground: "#F3D4B2",
    },
  }),
  voltage: createDesign({
    key: "voltage",
    label: "Voltage Studio",
    summary: "Creative-suite contrast with electric accents and motion.",
    icon: "lightning-bolt-outline",
    typography: {
      ...uiTypography,
      display: "LexendBold",
      heading: "LexendBold",
      body: "LexendRegular",
      bodyBold: "LexendBold",
      mono: monoFamily,
      eyebrowSpacing: 2.2,
    },
    spacing: {
      lg: 20,
      xl: 28,
    },
    radius: {
      md: 14,
      lg: 20,
      xl: 28,
    },
    motion: {
      pressScale: 0.94,
      standard: 170,
      slow: 240,
    },
    chrome: {
      borderWeight: 1,
      panel: "studio",
    },
    light: {
      background: "#F7F4FF",
      surface: "#FFFFFF",
      surfaceAlt: "#F0EAFF",
      surfaceRaised: "#FFFFFF",
      border: "#D5CBFF",
      borderStrong: "#BAABFF",
      primary: "#F43F7A",
      primaryForeground: "#FFF7FB",
      primaryLight: "#FFE0EC",
      accent: "#00C2FF",
      accentForeground: "#05273C",
      text: "#1F1147",
      textSecondary: "#5E4C90",
      textMuted: "#8D7CBC",
      success: "#0F9D6E",
      warning: "#FF7A1A",
      cardBorder: "#D5CBFF",
      drawerBackground: "#F3EEFF",
      headerBackground: "rgba(247, 244, 255, 0.9)",
      headerForeground: "#1F1147",
      inputBackground: "#FFFFFF",
      inputBorder: "#BAABFF",
      inputFocusBorder: "#F43F7A",
      heroStart: "#FFF1F8",
      heroEnd: "#E9E5FF",
      heroGlow: "rgba(244, 63, 122, 0.18)",
      badgeBackground: "#FDE2EF",
      badgeForeground: "#9D174D",
      chipBackground: "#E6F8FF",
      chipForeground: "#155E75",
    },
    dark: {
      background: "#080B18",
      surface: "#11162B",
      surfaceAlt: "#161D37",
      surfaceRaised: "#1C2442",
      border: "#242D52",
      borderStrong: "#3B4378",
      primary: "#FF4D8B",
      primaryForeground: "#210614",
      primaryLight: "#47142B",
      accent: "#00D9FF",
      accentForeground: "#042A34",
      text: "#F3EFFF",
      textSecondary: "#C9BFEF",
      textMuted: "#8C84B6",
      success: "#3AE4AB",
      warning: "#FF9D3D",
      cardBorder: "#2B3562",
      drawerBackground: "#0D1223",
      headerBackground: "rgba(8, 11, 24, 0.92)",
      headerForeground: "#FFF1FA",
      inputBackground: "#10162A",
      inputBorder: "#33406F",
      inputFocusBorder: "#FF4D8B",
      heroStart: "#0A0E1F",
      heroEnd: "#21133B",
      heroGlow: "rgba(255, 77, 139, 0.24)",
      badgeBackground: "#3F1030",
      badgeForeground: "#FFD5E5",
      chipBackground: "#0A2C38",
      chipForeground: "#A5F3FC",
    },
  }),
  forge: createDesign({
    key: "forge",
    label: "Forge Workshop",
    summary: "Industrial warmth with tactile panels and firm hierarchy.",
    icon: "hammer-wrench",
    typography: {
      ...uiTypography,
      display: monoFamily,
      heading: "LexendBold",
      body: "LexendRegular",
      bodyBold: "LexendBold",
      mono: monoFamily,
      eyebrowSpacing: 2,
    },
    radius: {
      sm: 6,
      md: 10,
      lg: 14,
      xl: 18,
    },
    motion: {
      pressScale: 0.97,
      quick: 90,
      standard: 140,
      slow: 200,
    },
    chrome: {
      borderWeight: 2,
      panel: "forge",
    },
    light: {
      background: "#F2EEE7",
      surface: "#FBF7F1",
      surfaceAlt: "#E7DED1",
      surfaceRaised: "#FFF9F2",
      border: "#C2B4A0",
      borderStrong: "#8F7E67",
      primary: "#7C4A2D",
      primaryForeground: "#FFF7F0",
      primaryLight: "#E8D2C1",
      accent: "#9B7E3E",
      accentForeground: "#2E2310",
      text: "#231B15",
      textSecondary: "#5C4B3E",
      textMuted: "#8B7768",
      success: "#58734D",
      warning: "#B76A25",
      cardBorder: "#A7957E",
      drawerBackground: "#ECE4D8",
      headerBackground: "rgba(242, 238, 231, 0.94)",
      headerForeground: "#231B15",
      inputBackground: "#FBF7F1",
      inputBorder: "#8F7E67",
      inputFocusBorder: "#7C4A2D",
      heroStart: "#F6EFE5",
      heroEnd: "#E0D1BF",
      heroGlow: "rgba(124, 74, 45, 0.15)",
      badgeBackground: "#E2D1BD",
      badgeForeground: "#5A371F",
      chipBackground: "#E8D9C7",
      chipForeground: "#4B3121",
    },
    dark: {
      background: "#15110E",
      surface: "#211A15",
      surfaceAlt: "#2B221C",
      surfaceRaised: "#332922",
      border: "#4F4033",
      borderStrong: "#826650",
      primary: "#D89E5D",
      primaryForeground: "#2B190A",
      primaryLight: "#5A3A1F",
      accent: "#B6A06D",
      accentForeground: "#2C2613",
      text: "#F4EDE4",
      textSecondary: "#C8B8A5",
      textMuted: "#8E7A67",
      success: "#8CAA76",
      warning: "#E5A459",
      cardBorder: "#4F4033",
      drawerBackground: "#19130F",
      headerBackground: "rgba(21, 17, 14, 0.94)",
      headerForeground: "#FFF7EE",
      inputBackground: "#251D17",
      inputBorder: "#6B5745",
      inputFocusBorder: "#D89E5D",
      heroStart: "#1A130F",
      heroEnd: "#36271C",
      heroGlow: "rgba(216, 158, 93, 0.18)",
      badgeBackground: "#5A3A1F",
      badgeForeground: "#F8DEC0",
      chipBackground: "#3A2B20",
      chipForeground: "#EED5BA",
    },
  }),
  archive: createDesign({
    key: "archive",
    label: "Mono Archive",
    summary: "Typographic grayscale with quiet editorial discipline.",
    icon: "file-document-multiple-outline",
    typography: {
      ...uiTypography,
      display: serifFamily,
      heading: serifFamily,
      body: "LexendRegular",
      bodyBold: "LexendBold",
      mono: monoFamily,
      eyebrowSpacing: 2.6,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      xxl: 36,
      section: 32,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
    motion: {
      pressScale: 0.985,
      quick: 130,
      standard: 180,
      slow: 220,
    },
    chrome: {
      borderWeight: 1,
      panel: "archive",
    },
    light: {
      background: "#F5F5F2",
      surface: "#FCFCFA",
      surfaceAlt: "#ECECE8",
      surfaceRaised: "#FFFFFF",
      border: "#D7D7D0",
      borderStrong: "#A9A9A0",
      primary: "#161616",
      primaryForeground: "#F9F9F7",
      primaryLight: "#E7E7E0",
      accent: "#444444",
      accentForeground: "#F4F4F1",
      text: "#111111",
      textSecondary: "#505050",
      textMuted: "#8A8A82",
      success: "#3F3F3F",
      warning: "#5D5D55",
      cardBorder: "#D7D7D0",
      drawerBackground: "#F2F2EE",
      headerBackground: "rgba(245, 245, 242, 0.92)",
      headerForeground: "#111111",
      inputBackground: "#FCFCFA",
      inputBorder: "#B9B9AF",
      inputFocusBorder: "#111111",
      heroStart: "#F9F9F6",
      heroEnd: "#ECECE8",
      heroGlow: "rgba(17, 17, 17, 0.08)",
      badgeBackground: "#E7E7E0",
      badgeForeground: "#1E1E1E",
      chipBackground: "#EFEFEA",
      chipForeground: "#242424",
    },
    dark: {
      background: "#090909",
      surface: "#101010",
      surfaceAlt: "#171717",
      surfaceRaised: "#1F1F1F",
      border: "#292929",
      borderStrong: "#424242",
      primary: "#F5F5F5",
      primaryForeground: "#0A0A0A",
      primaryLight: "#202020",
      accent: "#CFCFCF",
      accentForeground: "#111111",
      text: "#F5F5F5",
      textSecondary: "#B8B8B8",
      textMuted: "#777777",
      success: "#D0D0D0",
      warning: "#A0A0A0",
      cardBorder: "#292929",
      drawerBackground: "#0C0C0C",
      headerBackground: "rgba(9, 9, 9, 0.92)",
      headerForeground: "#FAFAFA",
      inputBackground: "#0F0F0F",
      inputBorder: "#3A3A3A",
      inputFocusBorder: "#F5F5F5",
      heroStart: "#090909",
      heroEnd: "#171717",
      heroGlow: "rgba(255, 255, 255, 0.08)",
      badgeBackground: "#1F1F1F",
      badgeForeground: "#F4F4F4",
      chipBackground: "#161616",
      chipForeground: "#F5F5F5",
    },
  }),
};

export const CMS_DESIGN_ORDER: DesignVariant[] = [
  "northstar",
  "paper",
  "voltage",
  "forge",
  "archive",
];

export const lightColors = CMS_DESIGNS[DEFAULT_DESIGN].colors.light;
export const darkColors = CMS_DESIGNS[DEFAULT_DESIGN].colors.dark;

export function getDesignDefinition(design: DesignVariant) {
  return CMS_DESIGNS[design] ?? CMS_DESIGNS[DEFAULT_DESIGN];
}
