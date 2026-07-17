import { t } from "elysia";

// ─── i18n ──────────────────────────────────────────────────
// Optional per-language overrides. Supported languages: ar, id, cn, jp, ru.
// These are filled in manually (no auto-translation).

const i18nMap = t.Record(t.String(), t.String());

// ─── Request Schemas ───────────────────────────────────────

export const createAboutBody = t.Object({
  title: t.String({ minLength: 1 }),
  content: t.String({ minLength: 1 }),
  titleI18n: t.Optional(i18nMap),
  contentI18n: t.Optional(i18nMap),
  sortOrder: t.Optional(t.Numeric({ default: 0 })),
});
export type CreateAboutBody = typeof createAboutBody.static;

export const updateAboutBody = t.Object({
  title: t.Optional(t.String({ minLength: 1 })),
  content: t.Optional(t.String({ minLength: 1 })),
  titleI18n: t.Optional(i18nMap),
  contentI18n: t.Optional(i18nMap),
  sortOrder: t.Optional(t.Numeric()),
});
export type UpdateAboutBody = typeof updateAboutBody.static;

// ─── Response Schemas ──────────────────────────────────────

export const aboutResponse = t.Object({
  id: t.String(),
  title: t.String(),
  content: t.String(),
  titleI18n: t.Record(t.String(), t.String()),
  contentI18n: t.Record(t.String(), t.String()),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
export type AboutResponse = typeof aboutResponse.static;

export const aboutListResponse = t.Array(aboutResponse);

export const notFoundError = t.Object({
  message: t.String(),
});

export const messageResponse = t.Object({
  message: t.String(),
});
