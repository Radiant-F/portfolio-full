import { t } from "elysia";

export const createTagBody = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
});
export type CreateTagBody = typeof createTagBody.static;

export const updateTagBody = t.Object({
  name: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
});
export type UpdateTagBody = typeof updateTagBody.static;

export const tagResponse = t.Object({
  id: t.String(),
  name: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
export type TagResponse = typeof tagResponse.static;

export const tagListResponse = t.Array(tagResponse);

export const notFoundError = t.Object({
  message: t.String(),
});

export const conflictError = t.Object({
  message: t.String(),
});

export const messageResponse = t.Object({
  message: t.String(),
});
