// Supported languages for i18n (frontend keys → LibreTranslate ISO codes)
export const SUPPORTED_LANGS = ["ar", "id", "cn", "jp", "ru"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const LANG_TO_ISO: Record<SupportedLang, string> = {
  ar: "ar",
  id: "id",
  cn: "zh",
  jp: "ja",
  ru: "ru",
};

export type I18nMap = Partial<Record<SupportedLang, string>>;

function getLibreTranslateUrl(): string {
  return process.env.LIBRETRANSLATE_URL ?? "http://localhost:5000";
}

async function translateText(
  text: string,
  targetIso: string,
): Promise<string | null> {
  const url = getLibreTranslateUrl();
  const apiKey = process.env.LIBRETRANSLATE_API_KEY;

  const body: Record<string, string> = {
    q: text,
    source: "en",
    target: targetIso,
    format: "text",
  };
  if (apiKey) body.api_key = apiKey;

  try {
    const res = await fetch(`${url}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;

    const json = (await res.json()) as { translatedText?: string };
    return json.translatedText ?? null;
  } catch {
    return null;
  }
}

/**
 * Translates `text` from English into all 5 non-English target languages.
 * Runs all translations in parallel. Fails silently — languages that fail
 * are simply omitted from the result.
 */
export async function translateToAll(text: string): Promise<I18nMap> {
  const entries = await Promise.allSettled(
    SUPPORTED_LANGS.map(async (lang) => {
      const iso = LANG_TO_ISO[lang];
      const translated = await translateText(text, iso);
      return [lang, translated] as [SupportedLang, string | null];
    }),
  );

  const result: I18nMap = {};
  for (const entry of entries) {
    if (entry.status === "fulfilled") {
      const [lang, value] = entry.value;
      if (value !== null) result[lang] = value;
    }
  }
  return result;
}

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
