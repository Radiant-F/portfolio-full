import { describe, expect, it } from "bun:test";
import { TagService } from "../src/modules/tag/service";

let tagId: string;

describe("TagService", () => {
  it("should create a tag", async () => {
    const tag = await TagService.create({ name: "React Native" });
    expect(tag).toBeDefined();
    expect(tag.name).toBe("React Native");
    tagId = tag.id;
  });

  it("should get all tags", async () => {
    const tags = await TagService.getAll();
    expect(tags.length).toBeGreaterThanOrEqual(1);
  });

  it("should get tag by id", async () => {
    const tag = await TagService.getById(tagId);
    expect(tag).not.toBeNull();
    expect(tag!.name).toBe("React Native");
  });

  it("should get tag by name", async () => {
    const tag = await TagService.getByName("React Native");
    expect(tag).not.toBeNull();
    expect(tag!.id).toBe(tagId);
  });

  it("should return null for non-existent tag", async () => {
    const tag = await TagService.getById("non-existent-id");
    expect(tag).toBeNull();
  });

  it("should update a tag", async () => {
    const tag = await TagService.update(tagId, { name: "Expo" });
    expect(tag).not.toBeNull();
    expect(tag!.name).toBe("Expo");
  });

  it("should delete a tag", async () => {
    const deleted = await TagService.delete(tagId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(tagId);

    const found = await TagService.getById(tagId);
    expect(found).toBeNull();
  });
});
