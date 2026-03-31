import { eq, asc } from "drizzle-orm";
import { db } from "../../database";
import { contacts } from "../../database/schema";
import type { CreateContactBody, UpdateContactBody } from "./model";

export abstract class ContactService {
  static async getAll() {
    return db.select().from(contacts).orderBy(asc(contacts.sortOrder));
  }

  static async getById(id: string) {
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1);

    return contact ?? null;
  }

  static async create(data: CreateContactBody) {
    const [contact] = await db
      .insert(contacts)
      .values({
        platform: data.platform,
        title: data.title,
        url: data.url,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return contact;
  }

  static async update(id: string, data: UpdateContactBody) {
    const values: Record<string, unknown> = {};
    if (data.platform !== undefined) values.platform = data.platform;
    if (data.title !== undefined) values.title = data.title;
    if (data.url !== undefined) values.url = data.url;
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      return ContactService.getById(id);
    }

    const [updated] = await db
      .update(contacts)
      .set(values)
      .where(eq(contacts.id, id))
      .returning();

    return updated ?? null;
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(contacts)
      .where(eq(contacts.id, id))
      .returning();

    return deleted ?? null;
  }
}
