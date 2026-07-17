import { describe, expect, it, beforeAll } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { tagController } from "../src/modules/tag";
import { seedDefaultUser } from "../src/database/seed";

const app = new Elysia().use(cors()).use(authController).use(tagController);

const TEST_USERNAME = process.env.DEFAULT_USER_USERNAME!;
const TEST_PASSPHRASE = process.env.DEFAULT_USER_PASSPHRASE!;

let accessToken: string;
let tagId: string;

beforeAll(async () => {
  await seedDefaultUser();

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

describe("Tag Endpoints", () => {
  describe("GET /tags (public)", () => {
    it("should return list initially", async () => {
      const res = await app.handle(new Request("http://localhost/tags"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
    });
  });

  describe("POST /tags (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const res = await app.handle(
        new Request("http://localhost/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Android" }),
        })
      );
      expect(res.status).toBe(401);
    });

    it("should create a tag", async () => {
      const res = await app.handle(
        new Request("http://localhost/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "Android" }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.name).toBe("Android");
      tagId = data.id;
    });

    it("should reject duplicate tag name", async () => {
      const res = await app.handle(
        new Request("http://localhost/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "Android" }),
        })
      );

      expect(res.status).toBe(409);
    });
  });

  describe("GET /tags (after create)", () => {
    it("should return the created tag", async () => {
      const res = await app.handle(new Request("http://localhost/tags"));
      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((t: any) => t.id === tagId);
      expect(found).toBeDefined();
      expect(found.name).toBe("Android");
    });
  });

  describe("PUT /tags/:id", () => {
    it("should update tag name", async () => {
      const res = await app.handle(
        new Request(`http://localhost/tags/${tagId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "iOS" }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.name).toBe("iOS");
    });

    it("should return 404 for non-existent tag", async () => {
      const res = await app.handle(
        new Request("http://localhost/tags/non-existent-id", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: "Web" }),
        })
      );

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /tags/:id", () => {
    it("should delete tag", async () => {
      const res = await app.handle(
        new Request(`http://localhost/tags/${tagId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Tag deleted successfully");
    });

    it("should return 404 after deletion", async () => {
      const res = await app.handle(
        new Request(`http://localhost/tags/${tagId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      expect(res.status).toBe(404);
    });
  });
});
