import { t } from "elysia";

export const createExperienceBody = t.Object({
  companyTitle: t.String({ minLength: 1 }),
  companyLogo: t.File({ type: "image", maxSize: "2m" }),
  startDate: t.String({ format: "date" }),
  endDate: t.Optional(t.String({ format: "date" })),
  position: t.String({ minLength: 1 }),
  responsibility: t.String({ minLength: 1 }),
  sortOrder: t.Optional(t.Numeric({ default: 0 })),
});
export type CreateExperienceBody = typeof createExperienceBody.static;

export const updateExperienceBody = t.Object({
  companyTitle: t.Optional(t.String({ minLength: 1 })),
  companyLogo: t.Optional(t.File({ type: "image", maxSize: "2m" })),
  startDate: t.Optional(t.String({ format: "date" })),
  endDate: t.Optional(t.String({ format: "date" })),
  position: t.Optional(t.String({ minLength: 1 })),
  responsibility: t.Optional(t.String({ minLength: 1 })),
  sortOrder: t.Optional(t.Numeric()),
});
export type UpdateExperienceBody = typeof updateExperienceBody.static;

// Service-facing types (after file is uploaded to Cloudinary)
export type CreateExperienceData = {
  companyTitle: string;
  companyLogoUrl: string;
  startDate: Date;
  endDate: Date | null;
  position: string;
  responsibility: string;
  sortOrder?: number;
};

export type UpdateExperienceData = {
  companyTitle?: string;
  companyLogoUrl?: string;
  startDate?: Date;
  endDate?: Date | null;
  position?: string;
  responsibility?: string;
  sortOrder?: number;
};

export const achievementResponse = t.Object({
  id: t.String(),
  experienceId: t.String(),
  description: t.String(),
  descriptionI18n: t.Record(t.String(), t.String()),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
export type AchievementResponse = typeof achievementResponse.static;

export const experienceResponse = t.Object({
  id: t.String(),
  companyTitle: t.String(),
  companyLogoUrl: t.String(),
  startDate: t.Date(),
  endDate: t.Nullable(t.Date()),
  position: t.String(),
  responsibility: t.String(),
  responsibilityI18n: t.Record(t.String(), t.String()),
  sortOrder: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  achievements: t.Array(achievementResponse),
});
export type ExperienceResponse = typeof experienceResponse.static;

export const experienceListResponse = t.Array(experienceResponse);

export const updateExperienceTranslationBody = t.Object({
  lang: t.Union([
    t.Literal("ar"),
    t.Literal("id"),
    t.Literal("cn"),
    t.Literal("jp"),
    t.Literal("ru"),
  ]),
  responsibility: t.String({ minLength: 1 }),
});
export type UpdateExperienceTranslationBody =
  typeof updateExperienceTranslationBody.static;

export const updateAchievementTranslationBody = t.Object({
  lang: t.Union([
    t.Literal("ar"),
    t.Literal("id"),
    t.Literal("cn"),
    t.Literal("jp"),
    t.Literal("ru"),
  ]),
  description: t.String({ minLength: 1 }),
});
export type UpdateAchievementTranslationBody =
  typeof updateAchievementTranslationBody.static;

export const createAchievementBody = t.Object({
  description: t.String({ minLength: 1 }),
  sortOrder: t.Optional(t.Number({ default: 0 })),
});
export type CreateAchievementBody = typeof createAchievementBody.static;

export const updateAchievementBody = t.Object({
  description: t.Optional(t.String({ minLength: 1 })),
  sortOrder: t.Optional(t.Number()),
});
export type UpdateAchievementBody = typeof updateAchievementBody.static;

export const notFoundError = t.Object({
  message: t.String(),
});

export const messageResponse = t.Object({
  message: t.String(),
});
