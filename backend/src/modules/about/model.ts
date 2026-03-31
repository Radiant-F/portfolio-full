import { t } from "elysia";

// ─── Request Schemas ───────────────────────────────────────

export const upsertAboutBody = t.Object({
  content: t.String({ minLength: 1 }),
});
export type UpsertAboutBody = typeof upsertAboutBody.static;

// ─── Response Schemas ──────────────────────────────────────

export const aboutResponse = t.Object({
  id: t.String(),
  content: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
export type AboutResponse = typeof aboutResponse.static;

export const aboutEmptyResponse = t.Object({
  content: t.Null(),
});

export const aboutGetResponse = t.Union([aboutResponse, aboutEmptyResponse]);

export const notFoundError = t.Object({
  message: t.String(),
});
