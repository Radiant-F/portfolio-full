import { eq, asc, and, inArray } from "drizzle-orm";
import { db } from "../../database";
import {
  works,
  workLinks,
  workScreenshots,
  workTags,
  tags,
} from "../../database/schema";
import {
  mergeTranslation,
  type SupportedLang,
} from "../../services/translation";
import type {
  CreateWorkData,
  UpdateWorkData,
  CreateWorkLinkBody,
  UpdateWorkLinkBody,
} from "./model";

export function selectPreviewScreenshots<T>(
  orderedWorkIds: string[],
  screenshotsByWorkId: Map<string, T[]>,
  limit: number = 6,
) {
  if (limit <= 0 || orderedWorkIds.length === 0) {
    return [];
  }

  const preview: T[] = [];
  let index = 0;

  while (preview.length < limit) {
    let addedInRound = false;

    for (const workId of orderedWorkIds) {
      const screenshots = screenshotsByWorkId.get(workId);
      if (!screenshots || index >= screenshots.length) {
        continue;
      }

      preview.push(screenshots[index]);
      addedInRound = true;

      if (preview.length === limit) {
        break;
      }
    }

    if (!addedInRound) {
      break;
    }

    index += 1;
  }

  return preview;
}

export abstract class WorkService {
  static async getAll() {
    const allWorks = await db
      .select()
      .from(works)
      .orderBy(asc(works.sortOrder));

    const allLinks = await db
      .select()
      .from(workLinks)
      .orderBy(asc(workLinks.sortOrder));

    const allScreenshots = await db
      .select()
      .from(workScreenshots)
      .orderBy(asc(workScreenshots.sortOrder));

    const allWorkTags = await db
      .select({
        workId: workTags.workId,
        id: tags.id,
        name: tags.name,
      })
      .from(workTags)
      .innerJoin(tags, eq(workTags.tagId, tags.id));

    return allWorks.map((work) => ({
      ...work,
      links: allLinks.filter((l) => l.workId === work.id),
      screenshots: allScreenshots.filter((s) => s.workId === work.id),
      tags: allWorkTags
        .filter((wt) => wt.workId === work.id)
        .map(({ id, name }) => ({ id, name })),
    }));
  }

  static async getById(id: string) {
    const [work] = await db
      .select()
      .from(works)
      .where(eq(works.id, id))
      .limit(1);

    if (!work) return null;

    const links = await db
      .select()
      .from(workLinks)
      .where(eq(workLinks.workId, id))
      .orderBy(asc(workLinks.sortOrder));

    const screenshots = await db
      .select()
      .from(workScreenshots)
      .where(eq(workScreenshots.workId, id))
      .orderBy(asc(workScreenshots.sortOrder));

    const workTagRows = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(workTags)
      .innerJoin(tags, eq(workTags.tagId, tags.id))
      .where(eq(workTags.workId, id));

    return { ...work, links, screenshots, tags: workTagRows };
  }

  static async create(data: CreateWorkData) {
    const [work] = await db
      .insert(works)
      .values({
        title: data.title,
        description: data.description,
        iconUrl: data.iconUrl,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return { ...work, links: [], screenshots: [], tags: [] };
  }

  static async update(id: string, data: UpdateWorkData) {
    const values: Record<string, unknown> = {};
    if (data.title !== undefined) values.title = data.title;
    if (data.description !== undefined) {
      values.description = data.description;
    }
    if (data.iconUrl !== undefined) values.iconUrl = data.iconUrl;
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      return WorkService.getById(id);
    }

    const [updated] = await db
      .update(works)
      .set(values)
      .where(eq(works.id, id))
      .returning();

    if (!updated) return null;

    const links = await db
      .select()
      .from(workLinks)
      .where(eq(workLinks.workId, id))
      .orderBy(asc(workLinks.sortOrder));

    const screenshots = await db
      .select()
      .from(workScreenshots)
      .where(eq(workScreenshots.workId, id))
      .orderBy(asc(workScreenshots.sortOrder));

    const workTagRows = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(workTags)
      .innerJoin(tags, eq(workTags.tagId, tags.id))
      .where(eq(workTags.workId, id));

    return { ...updated, links, screenshots, tags: workTagRows };
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(works)
      .where(eq(works.id, id))
      .returning();

    return deleted ?? null;
  }

  static async updateTranslations(
    id: string,
    lang: SupportedLang,
    description: string,
  ) {
    const [work] = await db
      .select({ descriptionI18n: works.descriptionI18n })
      .from(works)
      .where(eq(works.id, id))
      .limit(1);

    if (!work) return null;

    const updated18n = mergeTranslation(
      (work.descriptionI18n as Record<string, string>) ?? {},
      lang,
      description,
    );

    await db
      .update(works)
      .set({ descriptionI18n: updated18n })
      .where(eq(works.id, id));

    return WorkService.getById(id);
  }

  // ─── Links ────────────────────────────────────────────────

  static async addLink(workId: string, data: CreateWorkLinkBody) {
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return null;

    const [link] = await db
      .insert(workLinks)
      .values({
        workId,
        label: data.label,
        platform: data.platform,
        url: data.url,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return link;
  }

  static async updateLink(id: string, data: UpdateWorkLinkBody) {
    const values: Record<string, unknown> = {};
    if (data.label !== undefined) values.label = data.label;
    if (data.platform !== undefined) values.platform = data.platform;
    if (data.url !== undefined) values.url = data.url;
    if (data.sortOrder !== undefined) values.sortOrder = data.sortOrder;

    if (Object.keys(values).length === 0) {
      const [link] = await db
        .select()
        .from(workLinks)
        .where(eq(workLinks.id, id))
        .limit(1);
      return link ?? null;
    }

    const [updated] = await db
      .update(workLinks)
      .set(values)
      .where(eq(workLinks.id, id))
      .returning();

    return updated ?? null;
  }

  static async deleteLink(id: string) {
    const [deleted] = await db
      .delete(workLinks)
      .where(eq(workLinks.id, id))
      .returning();

    return deleted ?? null;
  }

  // ─── Screenshots ─────────────────────────────────────────

  static async addScreenshot(
    workId: string,
    imageUrl: string,
    sortOrder: number = 0,
  ) {
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return null;

    const [screenshot] = await db
      .insert(workScreenshots)
      .values({ workId, imageUrl, sortOrder })
      .returning();

    return screenshot;
  }

  static async deleteScreenshot(id: string) {
    const [deleted] = await db
      .delete(workScreenshots)
      .where(eq(workScreenshots.id, id))
      .returning();

    return deleted ?? null;
  }

  // ─── Tags ────────────────────────────────────────────────

  static async getScreenshotsByWorkId(workId: string) {
    return db
      .select()
      .from(workScreenshots)
      .where(eq(workScreenshots.workId, workId))
      .orderBy(asc(workScreenshots.sortOrder));
  }

  static async getPreviewScreenshots(limit: number = 6) {
    if (limit <= 0) {
      return [];
    }

    const orderedWorks = await db
      .select({ id: works.id })
      .from(works)
      .orderBy(asc(works.sortOrder));

    if (orderedWorks.length === 0) {
      return [];
    }

    const allScreenshots = await db
      .select()
      .from(workScreenshots)
      .orderBy(asc(workScreenshots.sortOrder));

    if (allScreenshots.length === 0) {
      return [];
    }

    const screenshotsByWorkId = new Map<
      string,
      (typeof allScreenshots)[number][]
    >();

    for (const screenshot of allScreenshots) {
      const items = screenshotsByWorkId.get(screenshot.workId);
      if (items) {
        items.push(screenshot);
      } else {
        screenshotsByWorkId.set(screenshot.workId, [screenshot]);
      }
    }

    return selectPreviewScreenshots(
      orderedWorks.map((work) => work.id),
      screenshotsByWorkId,
      limit,
    );
  }

  static async addTag(workId: string, tagId: string) {
    // Verify work exists
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return { error: "Work not found" as const };

    // Verify tag exists
    const [tag] = await db
      .select({ id: tags.id, name: tags.name })
      .from(tags)
      .where(eq(tags.id, tagId))
      .limit(1);

    if (!tag) return { error: "Tag not found" as const };

    // Check if already attached
    const [existing] = await db
      .select()
      .from(workTags)
      .where(and(eq(workTags.workId, workId), eq(workTags.tagId, tagId)))
      .limit(1);

    if (existing) return { error: "duplicate" as const };

    await db.insert(workTags).values({ workId, tagId });

    return { tag };
  }

  static async removeTag(workId: string, tagId: string) {
    const [deleted] = await db
      .delete(workTags)
      .where(and(eq(workTags.workId, workId), eq(workTags.tagId, tagId)))
      .returning();

    return deleted ?? null;
  }

  // ─── Bulk Tags ───────────────────────────────────────────

  static async getTagsByWorkId(workId: string) {
    return db
      .select({ id: tags.id, name: tags.name })
      .from(workTags)
      .innerJoin(tags, eq(workTags.tagId, tags.id))
      .where(eq(workTags.workId, workId));
  }

  static async bulkAddTags(workId: string, tagIds: string[]) {
    // Verify work exists
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return { error: "Work not found" as const };

    // Verify all tags exist
    const foundTags = await db
      .select({ id: tags.id })
      .from(tags)
      .where(inArray(tags.id, tagIds));

    if (foundTags.length !== tagIds.length) {
      return { error: "One or more tags not found" as const };
    }

    // Filter out already-attached tags
    const existing = await db
      .select({ tagId: workTags.tagId })
      .from(workTags)
      .where(eq(workTags.workId, workId));

    const existingIds = new Set(existing.map((e) => e.tagId));
    const newTagIds = tagIds.filter((id) => !existingIds.has(id));

    if (newTagIds.length > 0) {
      await db
        .insert(workTags)
        .values(newTagIds.map((tagId) => ({ workId, tagId })));
    }

    return { tags: await WorkService.getTagsByWorkId(workId) };
  }

  static async syncTags(workId: string, tagIds: string[]) {
    // Verify work exists
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return { error: "Work not found" as const };

    // Verify all tags exist (if any provided)
    if (tagIds.length > 0) {
      const foundTags = await db
        .select({ id: tags.id })
        .from(tags)
        .where(inArray(tags.id, tagIds));

      if (foundTags.length !== tagIds.length) {
        return { error: "One or more tags not found" as const };
      }
    }

    // Delete all existing associations
    await db.delete(workTags).where(eq(workTags.workId, workId));

    // Insert new set
    if (tagIds.length > 0) {
      await db
        .insert(workTags)
        .values(tagIds.map((tagId) => ({ workId, tagId })));
    }

    return { tags: await WorkService.getTagsByWorkId(workId) };
  }

  // ─── Bulk Screenshots ───────────────────────────────────

  static async bulkAddScreenshots(
    workId: string,
    items: { imageUrl: string; sortOrder: number }[],
  ) {
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return null;

    const inserted = await db
      .insert(workScreenshots)
      .values(items.map((item) => ({ workId, ...item })))
      .returning();

    return inserted;
  }

  static async reorderScreenshots(
    workId: string,
    items: { id: string; sortOrder: number }[],
  ) {
    // Verify work exists
    const [work] = await db
      .select({ id: works.id })
      .from(works)
      .where(eq(works.id, workId))
      .limit(1);

    if (!work) return null;

    for (const item of items) {
      await db
        .update(workScreenshots)
        .set({ sortOrder: item.sortOrder })
        .where(
          and(
            eq(workScreenshots.id, item.id),
            eq(workScreenshots.workId, workId),
          ),
        );
    }

    return WorkService.getScreenshotsByWorkId(workId);
  }
}
