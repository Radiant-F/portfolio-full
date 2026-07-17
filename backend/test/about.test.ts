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

const TEST_USERNAME = process.env.DEFAULT_USER_USERNAME!;
const TEST_PASSPHRASE = process.env.DEFAULT_USER_PASSPHRASE!;

let accessToken: string;
let itemId: string;

beforeAll(async () => {
  await seedDefaultUser();
  await db.delete(about);

  const res = await app.handle(
    new Request("http://localhost/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: TEST_USERNAME, passphrase: TEST_PASSPHRASE }),
    })
  );
  const data = await res.json();
  accessToken = data.accessToken;
});

describe("About Endpoints", () => {
  describe("GET /about (empty)", () => {
    it("should return an empty array when no items exist", async () => {
      const res = await app.handle(new Request("http://localhost/about"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
      expect(data.length).toBe(0);
    });
  });

  describe("POST /about (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Intro",
            content: "Hello world",
          }),
        })
      );
      expect(res.status).toBe(401);
    });

    it("should create an about item", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: "Introduction",
            content: "I'm a full-stack developer.",
            sortOrder: 1,
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.title).toBe("Introduction");
      expect(data.content).toBe("I'm a full-stack developer.");
      expect(data.sortOrder).toBe(1);
      expect(data.titleI18n).toEqual({});
      expect(data.contentI18n).toEqual({});
      expect(data.id).toBeDefined();

      itemId = data.id;
    });

    it("should store content verbatim (no HTML sanitization)", async () => {
      const raw = '<p>Safe</p><script>alert("xss")</script>';
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title: "Raw", content: raw }),
        })
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).toBe(raw);
      expect(data.content).toContain("<script>");
    });

    it("should accept manual i18n translations", async () => {
      const res = await app.handle(
        new Request("http://localhost/about", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: "Bio",
            content: "Hello",
            titleI18n: { id: "Biografi" },
            contentI18n: { id: "Halo", jp: "こんにちは" },
          }),
        })
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.titleI18n).toEqual({ id: "Biografi" });
      expect(data.contentI18n).toEqual({ id: "Halo", jp: "こんにちは" });
    });
  });

  describe("GET /about (after create)", () => {
    it("should return the created items as an array", async () => {
      const res = await app.handle(new Request("http://localhost/about"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
      const found = data.find((i: any) => i.id === itemId);
      expect(found).toBeDefined();
      expect(found.title).toBe("Introduction");
    });
  });

  describe("PUT /about/:id", () => {
    it("should update an item", async () => {
      const res = await app.handle(
        new Request(`http://localhost/about/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            content: "Updated bio.",
            contentI18n: { ru: "Обновлено" },
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.content).toBe("Updated bio.");
      expect(data.title).toBe("Introduction");
      expect(data.contentI18n).toEqual({ ru: "Обновлено" });
    });

    it("should return 404 for a non-existent item", async () => {
      const res = await app.handle(
        new Request("http://localhost/about/non-existent-id", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title: "Nope" }),
        })
      );
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /about/:id", () => {
    it("should delete an item", async () => {
      const res = await app.handle(
        new Request(`http://localhost/about/${itemId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("About item deleted successfully");
    });

    it("should return 404 after deletion", async () => {
      const res = await app.handle(
        new Request(`http://localhost/about/${itemId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );
      expect(res.status).toBe(404);
    });
  });

  describe("Cleanup", () => {
    it("should clean up about rows", async () => {
      await db.delete(about);
    });
  });
});
