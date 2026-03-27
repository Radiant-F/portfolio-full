import { describe, expect, it } from "bun:test";
import { SkillService } from "../src/modules/skill/service";
import { CloudinaryService } from "../src/modules/upload/service";

describe("SkillService", () => {
  let skillId: string;
  let detailId: string;

  it("should create a skill", async () => {
    const skill = await SkillService.create({
      title: "Test Skill",
      imageUrl: "https://example.com/image.png",
      sortOrder: 1,
    });

    expect(skill.id).toBeString();
    expect(skill.title).toBe("Test Skill");
    expect(skill.imageUrl).toBe("https://example.com/image.png");
    expect(skill.sortOrder).toBe(1);
    expect(skill.details).toEqual([]);

    skillId = skill.id;
  });

  it("should get all skills", async () => {
    const skills = await SkillService.getAll();
    expect(skills.length).toBeGreaterThanOrEqual(1);
    const found = skills.find((s) => s.id === skillId);
    expect(found).toBeDefined();
    expect(found!.details).toBeArray();
  });

  it("should get skill by id", async () => {
    const skill = await SkillService.getById(skillId);
    expect(skill).not.toBeNull();
    expect(skill!.title).toBe("Test Skill");
    expect(skill!.details).toEqual([]);
  });

  it("should return null for non-existent skill", async () => {
    const skill = await SkillService.getById("non-existent-id");
    expect(skill).toBeNull();
  });

  it("should update a skill", async () => {
    const updated = await SkillService.update(skillId, {
      title: "Updated Skill",
    });
    expect(updated).not.toBeNull();
    expect(updated!.title).toBe("Updated Skill");
    expect(updated!.imageUrl).toBe("https://example.com/image.png");
  });

  it("should add a detail to a skill", async () => {
    const detail = await SkillService.addDetail(skillId, {
      name: "Testing Phase",
      description: "Manage testing releases.",
      sortOrder: 0,
    });

    expect(detail).not.toBeNull();
    expect(detail!.name).toBe("Testing Phase");
    expect(detail!.skillId).toBe(skillId);

    detailId = detail!.id;
  });

  it("should return null when adding detail to non-existent skill", async () => {
    const detail = await SkillService.addDetail("non-existent-id", {
      name: "Test",
      description: "Test",
    });
    expect(detail).toBeNull();
  });

  it("should get skill with details", async () => {
    const skill = await SkillService.getById(skillId);
    expect(skill!.details.length).toBe(1);
    expect(skill!.details[0].name).toBe("Testing Phase");
  });

  it("should update a detail", async () => {
    const updated = await SkillService.updateDetail(detailId, {
      name: "Production Phase",
    });
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe("Production Phase");
    expect(updated!.description).toBe("Manage testing releases.");
  });

  it("should delete a detail", async () => {
    const deleted = await SkillService.deleteDetail(detailId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(detailId);
  });

  it("should delete a skill", async () => {
    const deleted = await SkillService.delete(skillId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(skillId);

    const found = await SkillService.getById(skillId);
    expect(found).toBeNull();
  });
});

describe("CloudinaryService", () => {
  it("should extract public id from Cloudinary URL", () => {
    const url =
      "https://res.cloudinary.com/demo/image/upload/v1234567890/portfolio/skills/test.png";
    const publicId = CloudinaryService.extractPublicId(url);
    expect(publicId).toBe("portfolio/skills/test");
  });

  it("should return null for non-Cloudinary URL", () => {
    const url = "https://example.com/image.png";
    const publicId = CloudinaryService.extractPublicId(url);
    expect(publicId).toBeNull();
  });
});
