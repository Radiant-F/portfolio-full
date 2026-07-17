import { eq, asc } from "drizzle-orm";
import { db } from "../../database";
import { about } from "../../database/schema";
import type { CreateAboutBody, UpdateAboutBody } from "./model";

export abstract class AboutService {
  static async getAll() {
    return db.select().from(about).orderBy(asc(about.sortOrder));
  }

  static async getById(id: string) {
    const [row] = await db
      .select()
      .from(about)
      .where(eq(about.id, id))
      .limit(1);
    return row ?? null;
  }

  static async create(data: CreateAboutBody) {
    const [created] = await db
      .insert(about)
      .values({
        title: data.title,
        content: data.content,
        titleI18n: data.titleI18n ?? {},
        contentI18n: data.contentI18n ?? {},
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return created;
  }

  static async update(id: string, data: UpdateAboutBody) {
    const values: Record<string, unknown> = {};
    if (data.title !== undefined) values.title = data.title;
    if (data.content !== undefined) values.content = data.content;
    if (data.titleI18n !== undefined) values.titleI18n = data.titleI18n;
    if (data.contentI18n !== undefined) values.contentI18n = data.contentI18n;
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      return AboutService.getById(id);
    }

    const [updated] = await db
      .update(about)
      .set(values)
      .where(eq(about.id, id))
      .returning();

    return updated ?? null;
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(about)
      .where(eq(about.id, id))
      .returning();

    return deleted ?? null;
  }
}
