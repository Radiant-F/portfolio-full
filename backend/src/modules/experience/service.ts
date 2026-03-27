import { eq, asc } from "drizzle-orm";
import { db } from "../../database";
import {
  experiences,
  experienceAchievements,
} from "../../database/schema";
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
    const [exp] = await db
      .insert(experiences)
      .values({
        companyTitle: data.companyTitle,
        companyLogoUrl: data.companyLogoUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        position: data.position,
        responsibility: data.responsibility,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return { ...exp, achievements: [] };
  }

  static async update(id: string, data: UpdateExperienceData) {
    const values: Record<string, unknown> = {};
    if (data.companyTitle !== undefined) values.companyTitle = data.companyTitle;
    if (data.companyLogoUrl !== undefined)
      values.companyLogoUrl = data.companyLogoUrl;
    if (data.startDate !== undefined) values.startDate = data.startDate;
    if (data.endDate !== undefined) values.endDate = data.endDate;
    if (data.position !== undefined) values.position = data.position;
    if (data.responsibility !== undefined)
      values.responsibility = data.responsibility;
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

  static async addAchievement(experienceId: string, data: CreateAchievementBody) {
    const [exp] = await db
      .select({ id: experiences.id })
      .from(experiences)
      .where(eq(experiences.id, experienceId))
      .limit(1);

    if (!exp) return null;

    const [achievement] = await db
      .insert(experienceAchievements)
      .values({
        experienceId,
        description: data.description,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return achievement;
  }

  static async updateAchievement(id: string, data: UpdateAchievementBody) {
    const values: Record<string, unknown> = {};
    if (data.description !== undefined) values.description = data.description;
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
}
