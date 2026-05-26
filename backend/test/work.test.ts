import { describe, expect, it, beforeAll, spyOn } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { tagController } from "../src/modules/tag";
import { workController } from "../src/modules/work";
import { CloudinaryService } from "../src/modules/upload/service";
import { seedDefaultUser } from "../src/database/seed";

// Mock CloudinaryService
const FAKE_ICON_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/works/icon.png";
const FAKE_UPDATED_ICON_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/works/updated.png";
const FAKE_SCREENSHOT_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/works/screenshots/ss.png";

let uploadCallCount = 0;
spyOn(CloudinaryService, "uploadImage").mockImplementation(async () => {
  uploadCallCount++;
  if (uploadCallCount === 1) return FAKE_ICON_URL;
  if (uploadCallCount === 2) return FAKE_UPDATED_ICON_URL;
  return FAKE_SCREENSHOT_URL;
});
spyOn(CloudinaryService, "deleteImage").mockImplementation(async () => ({
  result: "ok",
}));

const app = new Elysia()
  .use(cors())
  .use(authController)
  .use(tagController)
  .use(workController);

const TEST_EMAIL = process.env.DEFAULT_USER_EMAIL!;
const TEST_PASSWORD = process.env.DEFAULT_USER_PASSWORD!;

function createTestImage(name = "icon.png") {
  const pngBytes = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
    0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x01, 0xe2, 0x21, 0xbc, 0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
    0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
  ]);
  return new File([pngBytes], name, { type: "image/png" });
}

let accessToken: string;
let workId: string;
let linkId: string;
let screenshotId: string;
let tagId: string;

beforeAll(async () => {
  await seedDefaultUser();

  const res = await app.handle(
    new Request("http://localhost/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
    }),
  );
  const data = await res.json();
  accessToken = data.accessToken;
});

describe("Work Endpoints", () => {
  // --- Setup: Create a tag for later use ---
  describe("Setup", () => {
    it("should create a tag for work tests", async () => {
      const res = await app.handle(
        new Request("http://localhost/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "React Native" }),
        }),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      tagId = data.id;
    });
  });

  // --- Work CRUD ---
  describe("GET /works (public)", () => {
    it("should return list initially", async () => {
      const res = await app.handle(new Request("http://localhost/works"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
    });
  });

  describe("POST /works (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const formData = new FormData();
      formData.append("title", "Test App");
      formData.append("description", "A test application");
      formData.append("icon", createTestImage());

      const res = await app.handle(
        new Request("http://localhost/works", {
          method: "POST",
          body: formData,
        }),
      );
      expect(res.status).toBe(401);
    });

    it("should create a work", async () => {
      const formData = new FormData();
      formData.append("title", "Portfolio App");
      formData.append("description", "My portfolio showcase");
      formData.append("icon", createTestImage());
      formData.append("sortOrder", "1");

      const res = await app.handle(
        new Request("http://localhost/works", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.title).toBe("Portfolio App");
      expect(data.description).toBe("My portfolio showcase");
      expect(data.iconUrl).toBe(FAKE_ICON_URL);
      expect(data.sortOrder).toBe(1);
      expect(data.links).toEqual([]);
      expect(data.screenshots).toEqual([]);
      expect(data.tags).toEqual([]);

      workId = data.id;
    });
  });

  describe("GET /works (after create)", () => {
    it("should return the created work", async () => {
      const res = await app.handle(new Request("http://localhost/works"));
      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((w: any) => w.id === workId);
      expect(found).toBeDefined();
      expect(found.title).toBe("Portfolio App");
    });
  });

  describe("GET /works/:id", () => {
    it("should return work with relations", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.id).toBe(workId);
      expect(data.links).toBeArray();
      expect(data.screenshots).toBeArray();
      expect(data.tags).toBeArray();
    });

    it("should return 404 for non-existent work", async () => {
      const res = await app.handle(
        new Request("http://localhost/works/non-existent-id"),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /works/:id", () => {
    it("should update work title without changing icon", async () => {
      const formData = new FormData();
      formData.append("title", "Updated Portfolio App");

      const res = await app.handle(
        new Request(`http://localhost/works/${workId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.title).toBe("Updated Portfolio App");
      expect(data.iconUrl).toBe(FAKE_ICON_URL);
    });

    it("should update work icon and replace on Cloudinary", async () => {
      const formData = new FormData();
      formData.append("icon", createTestImage("updated.png"));

      const res = await app.handle(
        new Request(`http://localhost/works/${workId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.iconUrl).toBe(FAKE_UPDATED_ICON_URL);
    });
  });

  // --- Links ---
  describe("POST /works/:id/links", () => {
    it("should add a link", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/links`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            label: "GitHub",
            url: "https://github.com/example/portfolio",
            sortOrder: 0,
          }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.label).toBe("GitHub");
      expect(data.url).toBe("https://github.com/example/portfolio");
      expect(data.workId).toBe(workId);

      linkId = data.id;
    });

    it("should reject link for non-existent work", async () => {
      const res = await app.handle(
        new Request("http://localhost/works/non-existent/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            label: "Test",
            url: "https://example.com",
          }),
        }),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /works/:id/links/:linkId", () => {
    it("should update link", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/links/${linkId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ label: "Source Code" }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.label).toBe("Source Code");
    });
  });

  describe("DELETE /works/:id/links/:linkId", () => {
    it("should delete link", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/links/${linkId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Link deleted successfully");
    });
  });

  // --- Screenshots ---
  describe("POST /works/:id/screenshots", () => {
    it("should add a screenshot", async () => {
      const formData = new FormData();
      formData.append("image", createTestImage("screenshot.png"));
      formData.append("sortOrder", "0");

      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/screenshots`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.imageUrl).toBe(FAKE_SCREENSHOT_URL);
      expect(data.workId).toBe(workId);

      screenshotId = data.id;
    });

    it("should reject screenshot for non-existent work", async () => {
      const formData = new FormData();
      formData.append("image", createTestImage("ss.png"));

      const res = await app.handle(
        new Request("http://localhost/works/non-existent/screenshots", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /works/:id/screenshots/:screenshotId", () => {
    it("should delete screenshot", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/works/${workId}/screenshots/${screenshotId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        ),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Screenshot deleted successfully");
    });
  });

  // --- Tag Attachments ---
  describe("POST /works/:id/tags", () => {
    it("should attach a tag to work", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagId }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.name).toBe("React Native");
    });

    it("should reject duplicate tag attachment", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagId }),
        }),
      );

      expect(res.status).toBe(409);
    });

    it("should reject tag for non-existent work", async () => {
      const res = await app.handle(
        new Request("http://localhost/works/non-existent/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagId }),
        }),
      );

      expect(res.status).toBe(404);
    });
  });

  describe("GET /works/:id (with relations)", () => {
    it("should return work with attached tag", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.tags.length).toBe(1);
      expect(data.tags[0].name).toBe("React Native");
    });
  });

  describe("DELETE /works/:id/tags/:tagId", () => {
    it("should detach tag from work", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags/${tagId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Tag detached successfully");
    });
  });

  // --- Bulk Tags ---
  describe("POST /works/:id/tags/bulk", () => {
    let tagId2: string;

    it("should create extra tags for bulk tests", async () => {
      const res = await app.handle(
        new Request("http://localhost/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "TypeScript" }),
        }),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      tagId2 = data.id;
    });

    it("should bulk add tags", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags/bulk`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagIds: [tagId, tagId2] }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
      expect(data.length).toBe(2);
    });

    it("should return 404 for non-existent work", async () => {
      const res = await app.handle(
        new Request("http://localhost/works/non-existent/tags/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagIds: [tagId] }),
        }),
      );
      expect(res.status).toBe(404);
    });

    it("should return 404 for non-existent tags", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags/bulk`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagIds: ["non-existent-tag-id"] }),
        }),
      );
      expect(res.status).toBe(404);
    });

    it("should clean up extra tag", async () => {
      await app.handle(
        new Request(`http://localhost/tags/${tagId2}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
    });
  });

  describe("PUT /works/:id/tags (sync)", () => {
    it("should sync tags to just one", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagIds: [tagId] }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.length).toBe(1);
      expect(data[0].name).toBe("React Native");
    });

    it("should sync tags to empty (remove all)", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/tags`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tagIds: [] }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.length).toBe(0);
    });
  });

  // --- Bulk Screenshots ---
  describe("POST /works/:id/screenshots/bulk", () => {
    it("should bulk add screenshots", async () => {
      const formData = new FormData();
      formData.append("images", createTestImage("ss1.png"));
      formData.append("images", createTestImage("ss2.png"));

      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/screenshots/bulk`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
      expect(data.length).toBe(2);
      expect(data[0].sortOrder).toBe(0);
      expect(data[1].sortOrder).toBe(1);
    });

    it("should return 404 for non-existent work", async () => {
      const formData = new FormData();
      formData.append("images", createTestImage("ss.png"));

      const res = await app.handle(
        new Request("http://localhost/works/non-existent/screenshots/bulk", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /works/:id/screenshots/reorder", () => {
    it("should reorder screenshots", async () => {
      // First get the work to find screenshot IDs
      const getRes = await app.handle(
        new Request(`http://localhost/works/${workId}`),
      );
      const work = await getRes.json();
      const screenshots = work.screenshots;

      const res = await app.handle(
        new Request(`http://localhost/works/${workId}/screenshots/reorder`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            items: [
              { id: screenshots[0].id, sortOrder: 10 },
              { id: screenshots[1].id, sortOrder: 5 },
            ],
          }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
      // Sorted by sortOrder asc
      expect(data[0].sortOrder).toBe(5);
      expect(data[1].sortOrder).toBe(10);
    });

    it("should return 404 for non-existent work", async () => {
      const res = await app.handle(
        new Request("http://localhost/works/non-existent/screenshots/reorder", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            items: [{ id: "any-id", sortOrder: 0 }],
          }),
        }),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("GET /works/screenshots/preview (public)", () => {
    it("should return the available preview screenshots without auth", async () => {
      const res = await app.handle(
        new Request("http://localhost/works/screenshots/preview"),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
      expect(data.length).toBeLessThanOrEqual(6);

      if (data.length > 0) {
        expect(data[0]).toHaveProperty("id");
        expect(data[0]).toHaveProperty("workId");
        expect(data[0]).toHaveProperty("imageUrl");
        expect(data[0]).toHaveProperty("sortOrder");
      }
    });
  });

  // --- Delete Work ---
  describe("DELETE /works/:id", () => {
    it("should delete work", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Work deleted successfully");
    });

    it("should return 404 after deletion", async () => {
      const res = await app.handle(
        new Request(`http://localhost/works/${workId}`),
      );
      expect(res.status).toBe(404);
    });
  });

  // --- Cleanup ---
  describe("Cleanup", () => {
    it("should delete test tag", async () => {
      const res = await app.handle(
        new Request(`http://localhost/tags/${tagId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      expect(res.status).toBe(200);
    });
  });
});
