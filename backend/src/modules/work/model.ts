import { t } from "elysia";

// ─── Work Body Schemas (request) ───────────────────────────

export const createWorkBody = t.Object({
  title: t.String({ minLength: 1 }),
  description: t.String({ minLength: 1 }),
  icon: t.File({ type: "image", maxSize: "2m" }),
  sortOrder: t.Optional(t.Numeric({ default: 0 })),
});
export type CreateWorkBody = typeof createWorkBody.static;

export const updateWorkBody = t.Object({
  title: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String({ minLength: 1 })),
  icon: t.Optional(t.File({ type: "image", maxSize: "2m" })),
  sortOrder: t.Optional(t.Numeric()),
});
export type UpdateWorkBody = typeof updateWorkBody.static;

// Service-facing types (after file is uploaded to Cloudinary)
export type CreateWorkData = {
  title: string;
  description: string;
  iconUrl: string;
  sortOrder?: number;
};

export type UpdateWorkData = {
  title?: string;
  description?: string;
  iconUrl?: string;
  sortOrder?: number;
};

// ─── Link Body Schemas ─────────────────────────────────────

export const createWorkLinkBody = t.Object({
  label: t.String({ minLength: 1, maxLength: 100 }),
  url: t.String({ format: "uri" }),
  sortOrder: t.Optional(t.Number({ default: 0 })),
});
export type CreateWorkLinkBody = typeof createWorkLinkBody.static;

export const updateWorkLinkBody = t.Object({
  label: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  url: t.Optional(t.String({ format: "uri" })),
  sortOrder: t.Optional(t.Number()),
});
export type UpdateWorkLinkBody = typeof updateWorkLinkBody.static;

// ─── Screenshot Body Schema ────────────────────────────────

export const createScreenshotBody = t.Object({
  image: t.File({ type: "image", maxSize: "5m" }),
  sortOrder: t.Optional(t.Numeric({ default: 0 })),
});
export type CreateScreenshotBody = typeof createScreenshotBody.static;

// ─── Tag Attach Schema ─────────────────────────────────────

export const attachTagBody = t.Object({
  tagId: t.String({ minLength: 1 }),
});
export type AttachTagBody = typeof attachTagBody.static;

// ─── Response Schemas ──────────────────────────────────────

export const workLinkResponse = t.Object({
  id: t.String(),
  workId: t.String(),
  label: t.String(),
  url: t.String(),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const workScreenshotResponse = t.Object({
  id: t.String(),
  workId: t.String(),
  imageUrl: t.String(),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const workTagResponse = t.Object({
  id: t.String(),
  name: t.String(),
});

export const workResponse = t.Object({
  id: t.String(),
  title: t.String(),
  description: t.String(),
  iconUrl: t.String(),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  links: t.Array(workLinkResponse),
  screenshots: t.Array(workScreenshotResponse),
  tags: t.Array(workTagResponse),
});
export type WorkResponse = typeof workResponse.static;

export const workListResponse = t.Array(workResponse);

export const notFoundError = t.Object({
  message: t.String(),
});

export const conflictError = t.Object({
  message: t.String(),
});

export const messageResponse = t.Object({
  message: t.String(),
});

// ─── Bulk Tag Schemas ──────────────────────────────────────

export const bulkAddTagsBody = t.Object({
  tagIds: t.Array(t.String({ minLength: 1 }), { minItems: 1 }),
});
export type BulkAddTagsBody = typeof bulkAddTagsBody.static;

export const syncTagsBody = t.Object({
  tagIds: t.Array(t.String({ minLength: 1 })),
});
export type SyncTagsBody = typeof syncTagsBody.static;

export const workTagListResponse = t.Array(workTagResponse);

// ─── Bulk Screenshot Schemas ───────────────────────────────

export const bulkScreenshotBody = t.Object({
  images: t.Files({ type: "image", maxSize: "5m" }),
});
export type BulkScreenshotBody = typeof bulkScreenshotBody.static;

export const reorderScreenshotsBody = t.Object({
  items: t.Array(
    t.Object({
      id: t.String({ minLength: 1 }),
      sortOrder: t.Number(),
    }),
    { minItems: 1 }
  ),
});
export type ReorderScreenshotsBody = typeof reorderScreenshotsBody.static;

export const workScreenshotListResponse = t.Array(workScreenshotResponse);
