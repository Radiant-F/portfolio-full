import { describe, expect, it } from "bun:test";
import { ExperienceService } from "../src/modules/experience/service";

describe("ExperienceService", () => {
  let experienceId: string;
  let achievementId: string;

  it("should create an experience", async () => {
    const exp = await ExperienceService.create({
      companyTitle: "Acme Corp",
      companyLogoUrl: "https://example.com/acme.png",
      startDate: new Date("2023-01-15"),
      endDate: null,
      position: "Senior Developer",
      responsibility: "Lead the frontend team",
      sortOrder: 1,
    });

    expect(exp.id).toBeString();
    expect(exp.companyTitle).toBe("Acme Corp");
    expect(exp.companyLogoUrl).toBe("https://example.com/acme.png");
    expect(exp.position).toBe("Senior Developer");
    expect(exp.responsibility).toBe("Lead the frontend team");
    expect(exp.endDate).toBeNull();
    expect(exp.sortOrder).toBe(1);
    expect(exp.achievements).toEqual([]);
    expect(exp.responsibilityI18n).toBeDefined();
    expect(typeof exp.responsibilityI18n).toBe("object");

    experienceId = exp.id;
  });

  it("should get all experiences", async () => {
    const list = await ExperienceService.getAll();
    expect(list.length).toBeGreaterThanOrEqual(1);
    const found = list.find((e) => e.id === experienceId);
    expect(found).toBeDefined();
    expect(found!.achievements).toBeArray();
  });

  it("should get experience by id", async () => {
    const exp = await ExperienceService.getById(experienceId);
    expect(exp).not.toBeNull();
    expect(exp!.companyTitle).toBe("Acme Corp");
    expect(exp!.achievements).toEqual([]);
  });

  it("should return null for non-existent experience", async () => {
    const exp = await ExperienceService.getById("non-existent-id");
    expect(exp).toBeNull();
  });

  it("should update an experience", async () => {
    const updated = await ExperienceService.update(experienceId, {
      companyTitle: "Acme Corporation",
      endDate: new Date("2024-06-30"),
    });
    expect(updated).not.toBeNull();
    expect(updated!.companyTitle).toBe("Acme Corporation");
    expect(updated!.endDate).toEqual(new Date("2024-06-30"));
    expect(updated!.position).toBe("Senior Developer");
  });

  it("should add an achievement to an experience", async () => {
    const achievement = await ExperienceService.addAchievement(experienceId, {
      description: "Shipped v2.0 ahead of schedule",
      sortOrder: 0,
    });

    expect(achievement).not.toBeNull();
    expect(achievement!.description).toBe("Shipped v2.0 ahead of schedule");
    expect(achievement!.experienceId).toBe(experienceId);
    expect(achievement!.descriptionI18n).toBeDefined();
    expect(typeof achievement!.descriptionI18n).toBe("object");

    achievementId = achievement!.id;
  });

  it("should return null when adding achievement to non-existent experience", async () => {
    const achievement = await ExperienceService.addAchievement(
      "non-existent-id",
      {
        description: "Test",
      },
    );
    expect(achievement).toBeNull();
  });

  it("should get experience with achievements", async () => {
    const exp = await ExperienceService.getById(experienceId);
    expect(exp!.achievements.length).toBe(1);
    expect(exp!.achievements[0].description).toBe(
      "Shipped v2.0 ahead of schedule",
    );
  });

  it("should update an achievement", async () => {
    const updated = await ExperienceService.updateAchievement(achievementId, {
      description: "Shipped v2.0 two weeks ahead of schedule",
    });
    expect(updated).not.toBeNull();
    expect(updated!.description).toBe(
      "Shipped v2.0 two weeks ahead of schedule",
    );
  });

  it("should delete an achievement", async () => {
    const deleted = await ExperienceService.deleteAchievement(achievementId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(achievementId);
  });

  it("should manually override experience translation", async () => {
    const updated = await ExperienceService.updateTranslations(
      experienceId,
      "jp",
      "貿任範囲の翻訳",
    );
    expect(updated).not.toBeNull();
    expect((updated!.responsibilityI18n as Record<string, string>).jp).toBe(
      "貿任範囲の翻訳",
    );
  });

  it("should return null from updateTranslations for non-existent experience", async () => {
    const updated = await ExperienceService.updateTranslations(
      "non-existent",
      "jp",
      "test",
    );
    expect(updated).toBeNull();
  });

  it("should delete an experience", async () => {
    const deleted = await ExperienceService.delete(experienceId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(experienceId);

    const found = await ExperienceService.getById(experienceId);
    expect(found).toBeNull();
  });
});
