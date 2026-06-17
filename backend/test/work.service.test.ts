import { describe, expect, it } from "bun:test";
import {
  selectPreviewScreenshots,
  WorkService,
} from "../src/modules/work/service";
import { TagService } from "../src/modules/tag/service";

let workId: string;
let linkId: string;
let screenshotId: string;
let tagId: string;

describe("WorkService", () => {
  it("should create a work", async () => {
    const work = await WorkService.create({
      title: "My Portfolio App",
      description: "A portfolio showcase application",
      iconUrl: "https://example.com/icon.png",
      sortOrder: 0,
    });
    expect(work).toBeDefined();
    expect(work.title).toBe("My Portfolio App");
    expect(work.iconUrl).toBe("https://example.com/icon.png");
    expect(work.links).toEqual([]);
    expect(work.screenshots).toEqual([]);
    expect(work.tags).toEqual([]);
    expect(work.descriptionI18n).toBeDefined();
    expect(typeof work.descriptionI18n).toBe("object");

    workId = work.id;
  });

  it("should get all works", async () => {
    const works = await WorkService.getAll();
    expect(works.length).toBeGreaterThanOrEqual(1);
    const found = works.find((w) => w.id === workId);
    expect(found).toBeDefined();
  });

  it("should get work by id", async () => {
    const work = await WorkService.getById(workId);
    expect(work).not.toBeNull();
    expect(work!.title).toBe("My Portfolio App");
    expect(work!.links).toBeArray();
    expect(work!.screenshots).toBeArray();
    expect(work!.tags).toBeArray();
  });

  it("should return null for non-existent work", async () => {
    const work = await WorkService.getById("non-existent-id");
    expect(work).toBeNull();
  });

  it("should update a work", async () => {
    const work = await WorkService.update(workId, {
      title: "Updated Portfolio App",
      description: "Updated description",
    });
    expect(work).not.toBeNull();
    expect(work!.title).toBe("Updated Portfolio App");
    expect(work!.description).toBe("Updated description");
    expect(work!.descriptionI18n).toBeDefined();
    expect(typeof work!.descriptionI18n).toBe("object");
  });

  it("should manually override translation via updateTranslations", async () => {
    const work = await WorkService.updateTranslations(workId, "jp", "手動翻訳");
    expect(work).not.toBeNull();
    expect((work!.descriptionI18n as Record<string, string>).jp).toBe(
      "手動翻訳",
    );
  });

  it("should return null from updateTranslations for non-existent work", async () => {
    const work = await WorkService.updateTranslations(
      "non-existent",
      "jp",
      "test",
    );
    expect(work).toBeNull();
  });

  // ─── Links ────────────────────────────────────────────────

  it("should add a link to a work", async () => {
    const link = await WorkService.addLink(workId, {
      label: "GitHub",
      url: "https://github.com/example/repo",
      sortOrder: 0,
    });
    expect(link).not.toBeNull();
    expect(link!.label).toBe("GitHub");
    expect(link!.url).toBe("https://github.com/example/repo");
    expect(link!.workId).toBe(workId);

    linkId = link!.id;
  });

  it("should return null when adding link to non-existent work", async () => {
    const link = await WorkService.addLink("non-existent", {
      label: "Test",
      url: "https://example.com",
    });
    expect(link).toBeNull();
  });

  it("should update a link", async () => {
    const link = await WorkService.updateLink(linkId, {
      label: "Source Code",
    });
    expect(link).not.toBeNull();
    expect(link!.label).toBe("Source Code");
  });

  it("should delete a link", async () => {
    const deleted = await WorkService.deleteLink(linkId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(linkId);
  });

  // ─── Screenshots ─────────────────────────────────────────

  it("should add a screenshot to a work", async () => {
    const screenshot = await WorkService.addScreenshot(
      workId,
      "https://example.com/screenshot.png",
      0,
    );
    expect(screenshot).not.toBeNull();
    expect(screenshot!.imageUrl).toBe("https://example.com/screenshot.png");
    expect(screenshot!.workId).toBe(workId);

    screenshotId = screenshot!.id;
  });

  it("should return null when adding screenshot to non-existent work", async () => {
    const screenshot = await WorkService.addScreenshot(
      "non-existent",
      "https://example.com/ss.png",
    );
    expect(screenshot).toBeNull();
  });

  it("should delete a screenshot", async () => {
    const deleted = await WorkService.deleteScreenshot(screenshotId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(screenshotId);
  });

  // ─── Tags ────────────────────────────────────────────────

  it("should add a tag to a work", async () => {
    // Create a tag first
    const tag = await TagService.create({ name: "WorkTestTag" });
    tagId = tag.id;

    const result = await WorkService.addTag(workId, tagId);
    expect("tag" in result).toBe(true);
    if ("tag" in result) {
      expect(result.tag!.name).toBe("WorkTestTag");
    }
  });

  it("should reject duplicate tag attachment", async () => {
    const result = await WorkService.addTag(workId, tagId);
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("duplicate");
    }
  });

  it("should return error for non-existent work when adding tag", async () => {
    const result = await WorkService.addTag("non-existent", tagId);
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Work not found");
    }
  });

  it("should return error for non-existent tag when adding to work", async () => {
    const result = await WorkService.addTag(workId, "non-existent");
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Tag not found");
    }
  });

  it("should get work with all relations", async () => {
    // Add a link and screenshot for verification
    await WorkService.addLink(workId, {
      label: "Website",
      url: "https://example.com",
    });
    await WorkService.addScreenshot(workId, "https://example.com/ss2.png");

    const work = await WorkService.getById(workId);
    expect(work).not.toBeNull();
    expect(work!.links.length).toBeGreaterThanOrEqual(1);
    expect(work!.screenshots.length).toBeGreaterThanOrEqual(1);
    expect(work!.tags.length).toBeGreaterThanOrEqual(1);
    expect(work!.tags[0].name).toBe("WorkTestTag");
  });

  it("should remove a tag from a work", async () => {
    const deleted = await WorkService.removeTag(workId, tagId);
    expect(deleted).not.toBeNull();
  });

  it("should delete a work", async () => {
    const deleted = await WorkService.delete(workId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(workId);

    const found = await WorkService.getById(workId);
    expect(found).toBeNull();

    // Clean up the test tag
    await TagService.delete(tagId);
  });
});

// ─── Bulk Operations ──────────────────────────────────────

let bulkWorkId: string;
let bulkTagId1: string;
let bulkTagId2: string;
let bulkTagId3: string;

describe("WorkService – Bulk Operations", () => {
  it("should set up work and tags for bulk tests", async () => {
    const work = await WorkService.create({
      title: "Bulk Test Work",
      description: "Testing bulk operations",
      iconUrl: "https://example.com/icon.png",
      sortOrder: 0,
    });
    bulkWorkId = work.id;

    const tag1 = await TagService.create({ name: "BulkTag1" });
    const tag2 = await TagService.create({ name: "BulkTag2" });
    const tag3 = await TagService.create({ name: "BulkTag3" });
    bulkTagId1 = tag1.id;
    bulkTagId2 = tag2.id;
    bulkTagId3 = tag3.id;
  });

  // ─── Bulk Add Tags ───────────────────────────────────────

  it("should bulk add tags", async () => {
    const result = await WorkService.bulkAddTags(bulkWorkId, [
      bulkTagId1,
      bulkTagId2,
    ]);
    expect("tags" in result).toBe(true);
    const tags = (result as { tags: { id: string; name: string }[] }).tags;
    expect(tags.length).toBe(2);
  });

  it("should skip already-attached tags in bulk add", async () => {
    const result = await WorkService.bulkAddTags(bulkWorkId, [
      bulkTagId1,
      bulkTagId3,
    ]);
    expect("tags" in result).toBe(true);
    const tags = (result as { tags: { id: string; name: string }[] }).tags;
    expect(tags.length).toBe(3);
  });

  it("should return error for non-existent work in bulk add", async () => {
    const result = await WorkService.bulkAddTags("non-existent", [bulkTagId1]);
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Work not found");
    }
  });

  it("should return error for non-existent tags in bulk add", async () => {
    const result = await WorkService.bulkAddTags(bulkWorkId, [
      "non-existent-tag",
    ]);
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("One or more tags not found");
    }
  });

  // ─── Sync Tags ───────────────────────────────────────────

  it("should sync tags (replace all)", async () => {
    const result = await WorkService.syncTags(bulkWorkId, [bulkTagId2]);
    expect("tags" in result).toBe(true);
    const tags = (result as { tags: { id: string; name: string }[] }).tags;
    expect(tags.length).toBe(1);
    expect(tags[0].id).toBe(bulkTagId2);
  });

  it("should sync tags with empty array (remove all)", async () => {
    const result = await WorkService.syncTags(bulkWorkId, []);
    expect("tags" in result).toBe(true);
    const tags = (result as { tags: { id: string; name: string }[] }).tags;
    expect(tags.length).toBe(0);
  });

  it("should return error for non-existent work in sync", async () => {
    const result = await WorkService.syncTags("non-existent", [bulkTagId1]);
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Work not found");
    }
  });

  // ─── Bulk Add Screenshots ───────────────────────────────

  it("should bulk add screenshots", async () => {
    const result = await WorkService.bulkAddScreenshots(bulkWorkId, [
      { imageUrl: "https://example.com/ss1.png", sortOrder: 0 },
      { imageUrl: "https://example.com/ss2.png", sortOrder: 1 },
    ]);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(2);
    expect(result![0].imageUrl).toBe("https://example.com/ss1.png");
    expect(result![1].imageUrl).toBe("https://example.com/ss2.png");
  });

  it("should return null for non-existent work in bulk screenshots", async () => {
    const result = await WorkService.bulkAddScreenshots("non-existent", [
      { imageUrl: "https://example.com/ss.png", sortOrder: 0 },
    ]);
    expect(result).toBeNull();
  });

  // ─── Reorder Screenshots ────────────────────────────────

  it("should reorder screenshots", async () => {
    const screenshots = await WorkService.getScreenshotsByWorkId(bulkWorkId);
    expect(screenshots.length).toBe(2);

    const result = await WorkService.reorderScreenshots(bulkWorkId, [
      { id: screenshots[0].id, sortOrder: 10 },
      { id: screenshots[1].id, sortOrder: 5 },
    ]);
    expect(result).not.toBeNull();
    // Ordered by sortOrder asc, so second screenshot (5) comes first
    expect(result![0].sortOrder).toBe(5);
    expect(result![1].sortOrder).toBe(10);
  });

  it("should return null for non-existent work in reorder", async () => {
    const result = await WorkService.reorderScreenshots("non-existent", [
      { id: "any-id", sortOrder: 0 },
    ]);
    expect(result).toBeNull();
  });

  // ─── Cleanup ─────────────────────────────────────────────

  it("should clean up bulk test data", async () => {
    await WorkService.delete(bulkWorkId);
    await TagService.delete(bulkTagId1);
    await TagService.delete(bulkTagId2);
    await TagService.delete(bulkTagId3);
  });
});

describe("WorkService – Preview Screenshots", () => {
  const createPreviewMap = (
    entries: Array<[string, { imageUrl: string; workId: string }[]]>,
  ) => new Map(entries);

  it("should return empty array when no screenshots exist", () => {
    const result = selectPreviewScreenshots([], new Map(), 6);
    expect(result).toEqual([]);
  });

  it("should limit a single work to the first 6 screenshots", () => {
    const result = selectPreviewScreenshots(
      ["work-a"],
      createPreviewMap([
        [
          "work-a",
          Array.from({ length: 7 }, (_, index) => ({
            workId: "work-a",
            imageUrl: `https://example.com/preview-single-${index}.png`,
          })),
        ],
      ]),
      6,
    );

    expect(result).toHaveLength(6);
    expect(result.map((item) => item.imageUrl)).toEqual([
      "https://example.com/preview-single-0.png",
      "https://example.com/preview-single-1.png",
      "https://example.com/preview-single-2.png",
      "https://example.com/preview-single-3.png",
      "https://example.com/preview-single-4.png",
      "https://example.com/preview-single-5.png",
    ]);
  });

  it("should return all screenshots when a single work has fewer than 6", () => {
    const result = selectPreviewScreenshots(
      ["work-a"],
      createPreviewMap([
        [
          "work-a",
          Array.from({ length: 3 }, (_, index) => ({
            workId: "work-a",
            imageUrl: `https://example.com/preview-under-limit-${index}.png`,
          })),
        ],
      ]),
      6,
    );

    expect(result).toHaveLength(3);
    expect(result.map((item) => item.imageUrl)).toEqual([
      "https://example.com/preview-under-limit-0.png",
      "https://example.com/preview-under-limit-1.png",
      "https://example.com/preview-under-limit-2.png",
    ]);
  });

  it("should select screenshots round-robin across multiple works", () => {
    const result = selectPreviewScreenshots(
      ["work-a", "work-b", "work-c"],
      createPreviewMap([
        [
          "work-a",
          [
            {
              workId: "work-a",
              imageUrl: "https://example.com/preview-round-robin-a-0.png",
            },
            {
              workId: "work-a",
              imageUrl: "https://example.com/preview-round-robin-a-1.png",
            },
            {
              workId: "work-a",
              imageUrl: "https://example.com/preview-round-robin-a-2.png",
            },
          ],
        ],
        [
          "work-b",
          [
            {
              workId: "work-b",
              imageUrl: "https://example.com/preview-round-robin-b-0.png",
            },
            {
              workId: "work-b",
              imageUrl: "https://example.com/preview-round-robin-b-1.png",
            },
          ],
        ],
        [
          "work-c",
          [
            {
              workId: "work-c",
              imageUrl: "https://example.com/preview-round-robin-c-0.png",
            },
          ],
        ],
      ]),
      6,
    );

    expect(result).toHaveLength(6);
    expect(result.map((item) => item.imageUrl)).toEqual([
      "https://example.com/preview-round-robin-a-0.png",
      "https://example.com/preview-round-robin-b-0.png",
      "https://example.com/preview-round-robin-c-0.png",
      "https://example.com/preview-round-robin-a-1.png",
      "https://example.com/preview-round-robin-b-1.png",
      "https://example.com/preview-round-robin-a-2.png",
    ]);
  });
});
