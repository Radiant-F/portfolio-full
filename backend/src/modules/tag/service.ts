import { eq, asc } from "drizzle-orm";
import { db } from "../../database";
import { tags } from "../../database/schema";
import type { CreateTagBody, UpdateTagBody } from "./model";

export abstract class TagService {
  static async getAll() {
    return db.select().from(tags).orderBy(asc(tags.name));
  }

  static async getById(id: string) {
    const [tag] = await db
      .select()
      .from(tags)
      .where(eq(tags.id, id))
      .limit(1);

    return tag ?? null;
  }

  static async getByName(name: string) {
    const [tag] = await db
      .select()
      .from(tags)
      .where(eq(tags.name, name))
      .limit(1);

    return tag ?? null;
  }

  static async create(data: CreateTagBody) {
    const [tag] = await db
      .insert(tags)
      .values({ name: data.name })
      .returning();

    return tag;
  }

  static async update(id: string, data: UpdateTagBody) {
    const values: Record<string, unknown> = {};
    if (data.name !== undefined) values.name = data.name;

    if (Object.keys(values).length === 0) {
      return TagService.getById(id);
    }

    const [updated] = await db
      .update(tags)
      .set(values)
      .where(eq(tags.id, id))
      .returning();

    return updated ?? null;
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(tags)
      .where(eq(tags.id, id))
      .returning();

    return deleted ?? null;
  }
}
