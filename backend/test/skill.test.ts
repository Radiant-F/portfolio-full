import { describe, expect, it, beforeAll, spyOn } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { skillController } from "../src/modules/skill";
import { CloudinaryService } from "../src/modules/upload/service";
import { seedDefaultUser } from "../src/database/seed";

// Mock CloudinaryService to avoid real Cloudinary calls
const FAKE_IMAGE_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/skills/test.png";
const FAKE_UPDATED_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/skills/updated.png";

let uploadCallCount = 0;
spyOn(CloudinaryService, "uploadImage").mockImplementation(async () => {
  uploadCallCount++;
  return uploadCallCount === 1 ? FAKE_IMAGE_URL : FAKE_UPDATED_URL;
});
spyOn(CloudinaryService, "deleteImage").mockImplementation(async () => ({
  result: "ok",
}));

const app = new Elysia().use(cors()).use(authController).use(skillController);

const TEST_EMAIL = process.env.DEFAULT_USER_EMAIL!;
const TEST_PASSWORD = process.env.DEFAULT_USER_PASSWORD!;

// Helper to create a dummy image File
function createTestImage(name = "test.png") {
  // 1x1 transparent PNG
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
let skillId: string;
let detailId: string;

beforeAll(async () => {
  await seedDefaultUser();

  // Login to get access token
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

describe("Skill Endpoints", () => {
  describe("GET /skills (public)", () => {
    it("should return empty list initially", async () => {
      const res = await app.handle(new Request("http://localhost/skills"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
    });
  });

  describe("POST /skills (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const formData = new FormData();
      formData.append("title", "Play Console");
      formData.append("image", createTestImage());

      const res = await app.handle(
        new Request("http://localhost/skills", {
          method: "POST",
          body: formData,
        }),
      );
      expect(res.status).toBe(401);
    });

    it("should create a skill", async () => {
      const formData = new FormData();
      formData.append("title", "Play Console");
      formData.append("image", createTestImage());
      formData.append("sortOrder", "1");

      const res = await app.handle(
        new Request("http://localhost/skills", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.title).toBe("Play Console");
      expect(data.imageUrl).toBe(FAKE_IMAGE_URL);
      expect(data.sortOrder).toBe(1);
      expect(data.details).toEqual([]);

      skillId = data.id;
    });
  });

  describe("GET /skills (after create)", () => {
    it("should return the created skill", async () => {
      const res = await app.handle(new Request("http://localhost/skills"));

      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((s: any) => s.id === skillId);
      expect(found).toBeDefined();
      expect(found.title).toBe("Play Console");
    });
  });

  describe("GET /skills/:id", () => {
    it("should return skill with details", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}`),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.id).toBe(skillId);
      expect(data.details).toBeArray();
    });

    it("should return 404 for non-existent skill", async () => {
      const res = await app.handle(
        new Request("http://localhost/skills/non-existent-id"),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /skills/:id", () => {
    it("should update skill title without changing image", async () => {
      const formData = new FormData();
      formData.append("title", "Google Play Console");

      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.title).toBe("Google Play Console");
      expect(data.imageUrl).toBe(FAKE_IMAGE_URL);
    });

    it("should update skill image and replace on Cloudinary", async () => {
      const formData = new FormData();
      formData.append("image", createTestImage("updated.png"));

      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.imageUrl).toBe(FAKE_UPDATED_URL);
    });
  });

  describe("POST /skills/:skillId/details", () => {
    it("should add a detail", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}/details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: "Testing Phase",
            description:
              "Create and manage open, closed and internal testing releases.",
            sortOrder: 0,
          }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.name).toBe("Testing Phase");
      expect(data.skillId).toBe(skillId);
      expect(data.descriptionI18n).toBeDefined();
      expect(typeof data.descriptionI18n).toBe("object");

      detailId = data.id;
    });

    it("should reject detail for non-existent skill", async () => {
      const res = await app.handle(
        new Request("http://localhost/skills/non-existent/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: "Test",
            description: "Test",
          }),
        }),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /skills/:skillId/details/:id", () => {
    it("should update detail", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}/details/${detailId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "Production Phase" }),
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.name).toBe("Production Phase");
    });
  });

  describe("PATCH /skills/:id/details/:detailId/translations", () => {
    it("should manually override detail translation", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/skills/${skillId}/details/${detailId}/translations`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ lang: "jp", description: "日本語の詳細" }),
          },
        ),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.descriptionI18n.jp).toBe("日本語の詳細");
    });

    it("should return 404 for non-existent detail", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/skills/${skillId}/details/non-existent/translations`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ lang: "jp", description: "test" }),
          },
        ),
      );
      expect(res.status).toBe(404);
    });

    it("should reject unauthenticated translation override", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/skills/${skillId}/details/${detailId}/translations`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lang: "jp", description: "test" }),
          },
        ),
      );
      expect(res.status).toBe(401);
    });
  });

  describe("GET /skills?lang= (translation)", () => {
    it("should return translated description when translation is set", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills?lang=jp`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((s: any) => s.id === skillId);
      expect(found).toBeDefined();
      const detail = found.details.find((d: any) => d.id === detailId);
      expect(detail).toBeDefined();
      expect(detail.description).toBe("日本語の詳細");
    });

    it("GET /skills/:id?lang should apply translation", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}?lang=jp`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      const detail = data.details.find((d: any) => d.id === detailId);
      expect(detail).toBeDefined();
      expect(detail.description).toBe("日本語の詳細");
    });
  });

  describe("DELETE /skills/:skillId/details/:id", () => {
    it("should delete detail", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}/details/${detailId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Detail deleted successfully");
    });
  });

  describe("DELETE /skills/:id", () => {
    it("should delete skill", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Skill deleted successfully");
    });

    it("should return 404 after deletion", async () => {
      const res = await app.handle(
        new Request(`http://localhost/skills/${skillId}`),
      );
      expect(res.status).toBe(404);
    });
  });
});
