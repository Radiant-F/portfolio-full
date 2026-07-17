// Supported languages for manual i18n overrides.
export const SUPPORTED_LANGS = ["ar", "id", "cn", "jp", "ru"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export type I18nMap = Partial<Record<SupportedLang, string>>;

/**
 * Merges a manual override into an existing i18n map.
 */
export function mergeTranslation(
  existing: I18nMap,
  lang: SupportedLang,
  value: string,
): I18nMap {
  return { ...existing, [lang]: value };
}

/**
 * Resolves the display value for a translatable field.
 * Returns the translated value for the requested lang if available,
 * otherwise falls back to the original English value.
 */
export function resolveTranslation(
  original: string,
  i18n: I18nMap | null | undefined,
  lang: string | undefined,
): string {
  if (!lang || lang === "en" || !i18n) return original;
  const key = lang as SupportedLang;
  return i18n[key] ?? original;
}
