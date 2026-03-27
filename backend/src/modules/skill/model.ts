import { t } from "elysia";

export const createSkillBody = t.Object({
  title: t.String({ minLength: 1 }),
  image: t.File({ type: "image", maxSize: "2m" }),
  sortOrder: t.Optional(t.Numeric({ default: 0 })),
});
export type CreateSkillBody = typeof createSkillBody.static;

export const updateSkillBody = t.Object({
  title: t.Optional(t.String({ minLength: 1 })),
  image: t.Optional(t.File({ type: "image", maxSize: "2m" })),
  sortOrder: t.Optional(t.Numeric()),
});
export type UpdateSkillBody = typeof updateSkillBody.static;

// Service-facing types (after file is uploaded to Cloudinary)
export type CreateSkillData = {
  title: string;
  imageUrl: string;
  sortOrder?: number;
};

export type UpdateSkillData = {
  title?: string;
  imageUrl?: string;
  sortOrder?: number;
};

export const detailResponse = t.Object({
  id: t.String(),
  skillId: t.String(),
  name: t.String(),
  description: t.String(),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
export type DetailResponse = typeof detailResponse.static;

export const skillResponse = t.Object({
  id: t.String(),
  title: t.String(),
  imageUrl: t.String(),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  details: t.Array(detailResponse),
});
export type SkillResponse = typeof skillResponse.static;

export const skillListResponse = t.Array(skillResponse);

export const createDetailBody = t.Object({
  name: t.String({ minLength: 1 }),
  description: t.String({ minLength: 1 }),
  sortOrder: t.Optional(t.Number({ default: 0 })),
});
export type CreateDetailBody = typeof createDetailBody.static;

export const updateDetailBody = t.Object({
  name: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String({ minLength: 1 })),
  sortOrder: t.Optional(t.Number()),
});
export type UpdateDetailBody = typeof updateDetailBody.static;

export const notFoundError = t.Object({
  message: t.String(),
});

export const unauthorizedError = t.Object({
  message: t.Literal("Unauthorized"),
});

export const messageResponse = t.Object({
  message: t.String(),
});
