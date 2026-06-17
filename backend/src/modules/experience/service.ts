import { eq, asc } from "drizzle-orm";
import { db } from "../../database";
import { experiences, experienceAchievements } from "../../database/schema";
import {
  translateToAll,
  mergeTranslation,
  type SupportedLang,
} from "../../services/translation";
import type {
  CreateExperienceData,
  UpdateExperienceData,
  CreateAchievementBody,
  UpdateAchievementBody,
} from "./model";

export abstract class ExperienceService {
  static async getAll() {
    const allExperiences = await db
      .select()
      .from(experiences)
      .orderBy(asc(experiences.sortOrder));

    const allAchievements = await db
      .select()
      .from(experienceAchievements)
      .orderBy(asc(experienceAchievements.sortOrder));

    return allExperiences.map((exp) => ({
      ...exp,
      achievements: allAchievements.filter((a) => a.experienceId === exp.id),
    }));
  }

  static async getById(id: string) {
    const [exp] = await db
      .select()
      .from(experiences)
      .where(eq(experiences.id, id))
      .limit(1);

    if (!exp) return null;

    const achievements = await db
      .select()
      .from(experienceAchievements)
      .where(eq(experienceAchievements.experienceId, id))
      .orderBy(asc(experienceAchievements.sortOrder));

    return { ...exp, achievements };
  }

  static async create(data: CreateExperienceData) {
    const responsibilityI18n = await translateToAll(data.responsibility);

    const [exp] = await db
      .insert(experiences)
      .values({
        companyTitle: data.companyTitle,
        companyLogoUrl: data.companyLogoUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        position: data.position,
        responsibility: data.responsibility,
        responsibilityI18n,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return { ...exp, achievements: [] };
  }

  static async update(id: string, data: UpdateExperienceData) {
    const values: Record<string, unknown> = {};
    if (data.companyTitle !== undefined)
      values.companyTitle = data.companyTitle;
    if (data.companyLogoUrl !== undefined)
      values.companyLogoUrl = data.companyLogoUrl;
    if (data.startDate !== undefined) values.startDate = data.startDate;
    if (data.endDate !== undefined) values.endDate = data.endDate;
    if (data.position !== undefined) values.position = data.position;
    if (data.responsibility !== undefined) {
      values.responsibility = data.responsibility;
      values.responsibilityI18n = await translateToAll(data.responsibility);
    }
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      return ExperienceService.getById(id);
    }

    const [updated] = await db
      .update(experiences)
      .set(values)
      .where(eq(experiences.id, id))
      .returning();

    if (!updated) return null;

    const achievements = await db
      .select()
      .from(experienceAchievements)
      .where(eq(experienceAchievements.experienceId, id))
      .orderBy(asc(experienceAchievements.sortOrder));

    return { ...updated, achievements };
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(experiences)
      .where(eq(experiences.id, id))
      .returning();

    return deleted ?? null;
  }

  static async addAchievement(
    experienceId: string,
    data: CreateAchievementBody,
  ) {
    const [exp] = await db
      .select({ id: experiences.id })
      .from(experiences)
      .where(eq(experiences.id, experienceId))
      .limit(1);

    if (!exp) return null;

    const descriptionI18n = await translateToAll(data.description);

    const [achievement] = await db
      .insert(experienceAchievements)
      .values({
        experienceId,
        description: data.description,
        descriptionI18n,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return achievement;
  }

  static async updateAchievement(id: string, data: UpdateAchievementBody) {
    const values: Record<string, unknown> = {};
    if (data.description !== undefined) {
      values.description = data.description;
      values.descriptionI18n = await translateToAll(data.description);
    }
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      const [achievement] = await db
        .select()
        .from(experienceAchievements)
        .where(eq(experienceAchievements.id, id))
        .limit(1);
      return achievement ?? null;
    }

    const [updated] = await db
      .update(experienceAchievements)
      .set(values)
      .where(eq(experienceAchievements.id, id))
      .returning();

    return updated ?? null;
  }

  static async deleteAchievement(id: string) {
    const [deleted] = await db
      .delete(experienceAchievements)
      .where(eq(experienceAchievements.id, id))
      .returning();

    return deleted ?? null;
  }

  static async updateTranslations(
    id: string,
    lang: SupportedLang,
    responsibility: string,
  ) {
    const [exp] = await db
      .select({ responsibilityI18n: experiences.responsibilityI18n })
      .from(experiences)
      .where(eq(experiences.id, id))
      .limit(1);

    if (!exp) return null;

    const updatedI18n = mergeTranslation(
      (exp.responsibilityI18n as Record<string, string>) ?? {},
      lang,
      responsibility,
    );

    await db
      .update(experiences)
      .set({ responsibilityI18n: updatedI18n })
      .where(eq(experiences.id, id));

    return ExperienceService.getById(id);
  }

  static async updateAchievementTranslations(
    experienceId: string,
    achievementId: string,
    lang: SupportedLang,
    description: string,
  ) {
    const [achievement] = await db
      .select({ descriptionI18n: experienceAchievements.descriptionI18n })
      .from(experienceAchievements)
      .where(eq(experienceAchievements.id, achievementId))
      .limit(1);

    if (!achievement) return null;

    const updatedI18n = mergeTranslation(
      (achievement.descriptionI18n as Record<string, string>) ?? {},
      lang,
      description,
    );

    const [updated] = await db
      .update(experienceAchievements)
      .set({ descriptionI18n: updatedI18n })
      .where(eq(experienceAchievements.id, achievementId))
      .returning();

    return updated ?? null;
  }
}
