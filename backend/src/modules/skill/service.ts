import { eq, asc } from "drizzle-orm";
import { db } from "../../database";
import { skills, skillDetails } from "../../database/schema";
import type { CreateSkillData, UpdateSkillData, CreateDetailBody, UpdateDetailBody } from "./model";

export abstract class SkillService {
  static async getAll() {
    const allSkills = await db
      .select()
      .from(skills)
      .orderBy(asc(skills.sortOrder));

    const allDetails = await db
      .select()
      .from(skillDetails)
      .orderBy(asc(skillDetails.sortOrder));

    return allSkills.map((skill) => ({
      ...skill,
      details: allDetails.filter((d) => d.skillId === skill.id),
    }));
  }

  static async getById(id: string) {
    const [skill] = await db
      .select()
      .from(skills)
      .where(eq(skills.id, id))
      .limit(1);

    if (!skill) return null;

    const details = await db
      .select()
      .from(skillDetails)
      .where(eq(skillDetails.skillId, id))
      .orderBy(asc(skillDetails.sortOrder));

    return { ...skill, details };
  }

  static async create(data: CreateSkillData) {
    const [skill] = await db
      .insert(skills)
      .values({
        title: data.title,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return { ...skill, details: [] };
  }

  static async update(id: string, data: UpdateSkillData) {
    const values: Record<string, unknown> = {};
    if (data.title !== undefined) values.title = data.title;
    if (data.imageUrl !== undefined) values.imageUrl = data.imageUrl;
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      return SkillService.getById(id);
    }

    const [updated] = await db
      .update(skills)
      .set(values)
      .where(eq(skills.id, id))
      .returning();

    if (!updated) return null;

    const details = await db
      .select()
      .from(skillDetails)
      .where(eq(skillDetails.skillId, id))
      .orderBy(asc(skillDetails.sortOrder));

    return { ...updated, details };
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning();

    return deleted ?? null;
  }

  static async addDetail(skillId: string, data: CreateDetailBody) {
    const [skill] = await db
      .select({ id: skills.id })
      .from(skills)
      .where(eq(skills.id, skillId))
      .limit(1);

    if (!skill) return null;

    const [detail] = await db
      .insert(skillDetails)
      .values({
        skillId,
        name: data.name,
        description: data.description,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return detail;
  }

  static async updateDetail(id: string, data: UpdateDetailBody) {
    const values: Record<string, unknown> = {};
    if (data.name !== undefined) values.name = data.name;
    if (data.description !== undefined) values.description = data.description;
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      const [detail] = await db
        .select()
        .from(skillDetails)
        .where(eq(skillDetails.id, id))
        .limit(1);
      return detail ?? null;
    }

    const [updated] = await db
      .update(skillDetails)
      .set(values)
      .where(eq(skillDetails.id, id))
      .returning();

    return updated ?? null;
  }

  static async deleteDetail(id: string) {
    const [deleted] = await db
      .delete(skillDetails)
      .where(eq(skillDetails.id, id))
      .returning();

    return deleted ?? null;
  }
}
