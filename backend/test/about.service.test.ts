import { describe, expect, it } from "bun:test";
import { AboutService } from "../src/modules/about/service";
import { db } from "../src/database";
import { about } from "../src/database/schema";

describe("AboutService", () => {
  // Clean up before tests
  it("should clean up any existing about row", async () => {
    await db.delete(about);
  });

  it("should return null when no about exists", async () => {
    const result = await AboutService.get();
    expect(result).toBeNull();
  });

  it("should create about content via upsert", async () => {
    const result = await AboutService.upsert(
      "<p>Hello, I'm a developer.</p>"
    );
    expect(result).toBeDefined();
    expect(result.content).toBe("<p>Hello, I'm a developer.</p>");
    expect(result.id).toBeDefined();
  });

  it("should get about content", async () => {
    const result = await AboutService.get();
    expect(result).not.toBeNull();
    expect(result!.content).toBe("<p>Hello, I'm a developer.</p>");
  });

  it("should update about content via upsert", async () => {
    const result = await AboutService.upsert(
      "<p>Updated bio.</p><h2>Skills</h2>"
    );
    expect(result.content).toBe("<p>Updated bio.</p><h2>Skills</h2>");
  });

  it("should sanitize dangerous HTML", async () => {
    const result = await AboutService.upsert(
      '<p>Safe content</p><script>alert("xss")</script>'
    );
    expect(result.content).toBe("<p>Safe content</p>");
    expect(result.content).not.toContain("<script>");
  });

  it("should allow standard rich text tags", async () => {
    const html =
      '<h1>Title</h1><p><strong>Bold</strong> and <em>italic</em></p><ul><li>Item</li></ul><a href="https://example.com">Link</a>';
    const result = await AboutService.upsert(html);
    expect(result.content).toContain("<h1>");
    expect(result.content).toContain("<strong>");
    expect(result.content).toContain("<em>");
    expect(result.content).toContain("<ul>");
    expect(result.content).toContain("<li>");
    expect(result.content).toContain('<a href="https://example.com">');
  });

  it("should strip onclick and other event attributes", async () => {
    const result = await AboutService.upsert(
      '<p onclick="alert(1)">Click me</p>'
    );
    expect(result.content).toBe("<p>Click me</p>");
    expect(result.content).not.toContain("onclick");
  });

  // Clean up after tests
  it("should clean up about row after tests", async () => {
    await db.delete(about);
  });
});
