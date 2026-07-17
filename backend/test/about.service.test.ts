import { describe, expect, it, beforeAll } from "bun:test";
import { AboutService } from "../src/modules/about/service";
import { db } from "../src/database";
import { about } from "../src/database/schema";

describe("AboutService", () => {
  let itemId: string;

  beforeAll(async () => {
    await db.delete(about);
  });

  it("should return an empty array when no items exist", async () => {
    const result = await AboutService.getAll();
    expect(result).toBeArray();
    expect(result.length).toBe(0);
  });

  it("should create an about item", async () => {
    const result = await AboutService.create({
      title: "Introduction",
      content: "I'm a full-stack developer.",
      sortOrder: 1,
    });
    expect(result).toBeDefined();
    expect(result.title).toBe("Introduction");
    expect(result.content).toBe("I'm a full-stack developer.");
    expect(result.sortOrder).toBe(1);
    expect(result.titleI18n).toEqual({});
    expect(result.contentI18n).toEqual({});
    expect(result.id).toBeDefined();
    itemId = result.id;
  });

  it("should NOT sanitize / strip HTML — content is stored verbatim", async () => {
    const raw = '<p>Safe</p><script>alert("xss")</script>';
    const result = await AboutService.create({
      title: "Raw",
      content: raw,
    });
    expect(result.content).toBe(raw);
    expect(result.content).toContain("<script>");
  });

  it("should store manual i18n translations", async () => {
    const result = await AboutService.create({
      title: "Bio",
      content: "Hello",
      titleI18n: { id: "Biografi" },
      contentI18n: { id: "Halo", jp: "こんにちは" },
    });
    expect(result.titleI18n).toEqual({ id: "Biografi" });
    expect(result.contentI18n).toEqual({ id: "Halo", jp: "こんにちは" });
  });

  it("should get an item by id", async () => {
    const result = await AboutService.getById(itemId);
    expect(result).not.toBeNull();
    expect(result!.title).toBe("Introduction");
  });

  it("should return null for a non-existent id", async () => {
    const result = await AboutService.getById("non-existent-id");
    expect(result).toBeNull();
  });

  it("should list items ordered by sortOrder", async () => {
    const result = await AboutService.getAll();
    expect(result.length).toBe(3);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].sortOrder).toBeGreaterThanOrEqual(
        result[i - 1].sortOrder
      );
    }
  });

  it("should update an item", async () => {
    const result = await AboutService.update(itemId, {
      content: "Updated bio.",
      contentI18n: { ru: "Обновлено" },
    });
    expect(result).not.toBeNull();
    expect(result!.content).toBe("Updated bio.");
    expect(result!.title).toBe("Introduction");
    expect(result!.contentI18n).toEqual({ ru: "Обновлено" });
  });

  it("should return null when updating a non-existent item", async () => {
    const result = await AboutService.update("non-existent-id", {
      title: "Nope",
    });
    expect(result).toBeNull();
  });

  it("should delete an item", async () => {
    const deleted = await AboutService.delete(itemId);
    expect(deleted).not.toBeNull();
    const after = await AboutService.getById(itemId);
    expect(after).toBeNull();
  });

  it("should return null when deleting a non-existent item", async () => {
    const result = await AboutService.delete("non-existent-id");
    expect(result).toBeNull();
  });

  it("should clean up about rows after tests", async () => {
    await db.delete(about);
  });
});
