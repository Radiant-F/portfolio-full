import { t } from "elysia";

// ─── Request Schemas ───────────────────────────────────────

export const createContactBody = t.Object({
  platform: t.String({ minLength: 1, maxLength: 50 }),
  title: t.String({ minLength: 1, maxLength: 255 }),
  url: t.String({ format: "uri" }),
  sortOrder: t.Optional(t.Number({ default: 0 })),
});
export type CreateContactBody = typeof createContactBody.static;

export const updateContactBody = t.Object({
  platform: t.Optional(t.String({ minLength: 1, maxLength: 50 })),
  title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
  url: t.Optional(t.String({ format: "uri" })),
  sortOrder: t.Optional(t.Number()),
});
export type UpdateContactBody = typeof updateContactBody.static;

// ─── Response Schemas ──────────────────────────────────────

export const contactResponse = t.Object({
  id: t.String(),
  platform: t.String(),
  title: t.String(),
  url: t.String(),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
export type ContactResponse = typeof contactResponse.static;

export const contactListResponse = t.Array(contactResponse);

export const notFoundError = t.Object({
  message: t.String(),
});

export const messageResponse = t.Object({
  message: t.String(),
});
