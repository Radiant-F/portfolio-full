import { describe, expect, it, beforeAll, spyOn } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { experienceController } from "../src/modules/experience";
import { CloudinaryService } from "../src/modules/upload/service";
import { seedDefaultUser } from "../src/database/seed";

// Mock CloudinaryService to avoid real Cloudinary calls
const FAKE_LOGO_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/experiences/acme.png";
const FAKE_UPDATED_LOGO_URL =
  "https://res.cloudinary.com/demo/image/upload/v1/portfolio/experiences/updated.png";

let uploadCallCount = 0;
spyOn(CloudinaryService, "uploadImage").mockImplementation(async () => {
  uploadCallCount++;
  return uploadCallCount === 1 ? FAKE_LOGO_URL : FAKE_UPDATED_LOGO_URL;
});
spyOn(CloudinaryService, "deleteImage").mockImplementation(async () => ({
  result: "ok",
}));

const app = new Elysia()
  .use(cors())
  .use(authController)
  .use(experienceController);

const TEST_EMAIL = process.env.DEFAULT_USER_EMAIL!;
const TEST_PASSWORD = process.env.DEFAULT_USER_PASSWORD!;

// Helper to create a dummy image File
function createTestImage(name = "logo.png") {
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
let experienceId: string;
let achievementId: string;

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

describe("Experience Endpoints", () => {
  describe("GET /experiences (public)", () => {
    it("should return empty list initially", async () => {
      const res = await app.handle(new Request("http://localhost/experiences"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
    });
  });

  describe("POST /experiences (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const formData = new FormData();
      formData.append("companyTitle", "Acme Corp");
      formData.append("companyLogo", createTestImage());
      formData.append("startDate", "2023-01-15");
      formData.append("position", "Developer");
      formData.append("responsibility", "Build features");

      const res = await app.handle(
        new Request("http://localhost/experiences", {
          method: "POST",
          body: formData,
        }),
      );
      expect(res.status).toBe(401);
    });

    it("should create an experience", async () => {
      const formData = new FormData();
      formData.append("companyTitle", "Acme Corp");
      formData.append("companyLogo", createTestImage());
      formData.append("startDate", "2023-01-15");
      formData.append("position", "Senior Developer");
      formData.append("responsibility", "Lead the frontend team");
      formData.append("sortOrder", "1");

      const res = await app.handle(
        new Request("http://localhost/experiences", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.companyTitle).toBe("Acme Corp");
      expect(data.companyLogoUrl).toBe(FAKE_LOGO_URL);
      expect(data.position).toBe("Senior Developer");
      expect(data.endDate).toBeNull();
      expect(data.sortOrder).toBe(1);
      expect(data.achievements).toEqual([]);
      expect(data.responsibilityI18n).toBeDefined();
      expect(typeof data.responsibilityI18n).toBe("object");

      experienceId = data.id;
    });
  });

  describe("GET /experiences (after create)", () => {
    it("should return the created experience", async () => {
      const res = await app.handle(new Request("http://localhost/experiences"));
      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((e: any) => e.id === experienceId);
      expect(found).toBeDefined();
      expect(found.companyTitle).toBe("Acme Corp");
    });
  });

  describe("GET /experiences/:id", () => {
    it("should return experience with achievements", async () => {
      const res = await app.handle(
        new Request(`http://localhost/experiences/${experienceId}`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.id).toBe(experienceId);
      expect(data.achievements).toBeArray();
    });

    it("should return 404 for non-existent experience", async () => {
      const res = await app.handle(
        new Request("http://localhost/experiences/non-existent-id"),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /experiences/:id", () => {
    it("should update experience title without changing logo", async () => {
      const formData = new FormData();
      formData.append("companyTitle", "Acme Corporation");

      const res = await app.handle(
        new Request(`http://localhost/experiences/${experienceId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.companyTitle).toBe("Acme Corporation");
      expect(data.companyLogoUrl).toBe(FAKE_LOGO_URL);
    });

    it("should update experience logo and replace on Cloudinary", async () => {
      const formData = new FormData();
      formData.append("companyLogo", createTestImage("updated.png"));

      const res = await app.handle(
        new Request(`http://localhost/experiences/${experienceId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.companyLogoUrl).toBe(FAKE_UPDATED_LOGO_URL);
    });
  });

  describe("POST /experiences/:id/achievements", () => {
    it("should add an achievement", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/achievements`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              description: "Shipped v2.0 ahead of schedule",
              sortOrder: 0,
            }),
          },
        ),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.description).toBe("Shipped v2.0 ahead of schedule");
      expect(data.experienceId).toBe(experienceId);
      expect(data.descriptionI18n).toBeDefined();
      expect(typeof data.descriptionI18n).toBe("object");

      achievementId = data.id;
    });

    it("should reject achievement for non-existent experience", async () => {
      const res = await app.handle(
        new Request("http://localhost/experiences/non-existent/achievements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            description: "Test",
          }),
        }),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /experiences/:id/achievements/:achievementId", () => {
    it("should update achievement", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/achievements/${achievementId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              description: "Shipped v2.0 two weeks ahead of schedule",
            }),
          },
        ),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.description).toBe("Shipped v2.0 two weeks ahead of schedule");
    });
  });

  describe("PATCH /experiences/:id/translations", () => {
    it("should manually override responsibility translation", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/translations`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              lang: "jp",
              responsibility: "貿任範囲の翻訳",
            }),
          },
        ),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.responsibilityI18n.jp).toBe("貿任範囲の翻訳");
    });

    it("should return 404 for non-existent experience", async () => {
      const res = await app.handle(
        new Request("http://localhost/experiences/non-existent/translations", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ lang: "jp", responsibility: "test" }),
        }),
      );
      expect(res.status).toBe(404);
    });

    it("should reject unauthenticated translation override", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/translations`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lang: "jp", responsibility: "test" }),
          },
        ),
      );
      expect(res.status).toBe(401);
    });
  });

  describe("PATCH /experiences/:id/achievements/:achievementId/translations", () => {
    it("should manually override achievement description translation", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/achievements/${achievementId}/translations`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              lang: "ru",
              description: "Русская достижение",
            }),
          },
        ),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.descriptionI18n.ru).toBe("Русская достижение");
    });

    it("should return 404 for non-existent achievement", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/achievements/non-existent/translations`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ lang: "ru", description: "test" }),
          },
        ),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("GET /experiences?lang= (translation)", () => {
    it("should return translated responsibility when translation is set", async () => {
      const res = await app.handle(
        new Request(`http://localhost/experiences?lang=jp`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((e: any) => e.id === experienceId);
      expect(found).toBeDefined();
      expect(found.responsibility).toBe("貿任範囲の翻訳");
    });

    it("GET /experiences/:id?lang should apply translation", async () => {
      const res = await app.handle(
        new Request(`http://localhost/experiences/${experienceId}?lang=jp`),
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.responsibility).toBe("貿任範囲の翻訳");
    });
  });

  describe("DELETE /experiences/:id/achievements/:achievementId", () => {
    it("should delete achievement", async () => {
      const res = await app.handle(
        new Request(
          `http://localhost/experiences/${experienceId}/achievements/${achievementId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        ),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Achievement deleted successfully");
    });
  });

  describe("DELETE /experiences/:id", () => {
    it("should delete experience", async () => {
      const res = await app.handle(
        new Request(`http://localhost/experiences/${experienceId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Experience deleted successfully");
    });

    it("should return 404 after deletion", async () => {
      const res = await app.handle(
        new Request(`http://localhost/experiences/${experienceId}`),
      );
      expect(res.status).toBe(404);
    });
  });
});
