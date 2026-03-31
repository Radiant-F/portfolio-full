import { describe, expect, it, beforeAll } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { aboutController } from "../src/modules/about";
import { seedDefaultUser } from "../src/database/seed";
import { db } from "../src/database";
import { about } from "../src/database/schema";

const app = new Elysia()
  .use(cors())
  .use(authController)
  .use(aboutController);

const TEST_EMAIL = process.env.DEFAULT_USER_EMAIL!;
const TEST_PASSWORD = process.env.DEFAULT_USER_PASSWORD!;

let accessToken: string;

beforeAll(async () => {
  await seedDefaultUser();
  // Clean up any existing about row
  await db.delete(about);

  const res = await app.handle(
    new Request("http://localhost/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
    })
  );
  const data = await res.json();
  accessToken = data.accessToken;
});

describe("About Endpoints", () => {
  describe("GET /about (empty)", () => {
    it("should return null content when no about exists", async () => {
      const res = await app.handle(
        new Request("http://localhost/about")
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).toBeNull();
    });
  });

  describe("PUT /about (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: "<p>Hello world</p>",
          }),
        })
      );
      expect(res.status).toBe(401);
    });

    it("should create about content", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            content: "<p>I'm a full-stack developer.</p>",
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).toBe("<p>I'm a full-stack developer.</p>");
      expect(data.id).toBeDefined();
    });
  });

  describe("GET /about (after create)", () => {
    it("should return the about content", async () => {
      const res = await app.handle(
        new Request("http://localhost/about")
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).toBe("<p>I'm a full-stack developer.</p>");
    });
  });

  describe("PUT /about (update)", () => {
    it("should update existing about content", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            content: "<h1>About Me</h1><p>Updated bio.</p>",
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).toBe("<h1>About Me</h1><p>Updated bio.</p>");
    });
  });

  describe("PUT /about (sanitization)", () => {
    it("should strip script tags from content", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            content:
              '<p>Safe</p><script>alert("xss")</script><img src="valid.jpg" onerror="alert(1)">',
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).not.toContain("<script>");
      expect(data.content).not.toContain("onerror");
      expect(data.content).toContain("<p>Safe</p>");
      expect(data.content).toContain('<img src="valid.jpg" />');
    });
  });

  // Clean up
  describe("Cleanup", () => {
    it("should clean up about row", async () => {
      await db.delete(about);
    });
  });
});
