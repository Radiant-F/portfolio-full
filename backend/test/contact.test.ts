import { describe, expect, it, beforeAll } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { contactController } from "../src/modules/contact";
import { seedDefaultUser } from "../src/database/seed";

const app = new Elysia()
  .use(cors())
  .use(authController)
  .use(contactController);

const TEST_USERNAME = process.env.DEFAULT_USER_USERNAME!;
const TEST_PASSPHRASE = process.env.DEFAULT_USER_PASSPHRASE!;

let accessToken: string;
let contactId: string;

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

describe("Contact Endpoints", () => {
  describe("GET /contacts (public)", () => {
    it("should return list initially", async () => {
      const res = await app.handle(
        new Request("http://localhost/contacts")
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toBeArray();
    });
  });

  describe("POST /contacts (authenticated)", () => {
    it("should reject unauthenticated request", async () => {
      const res = await app.handle(
        new Request("http://localhost/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: "github",
            title: "GitHub",
            url: "https://github.com/myuser",
          }),
        })
      );
      expect(res.status).toBe(401);
    });

    it("should create a contact", async () => {
      const res = await app.handle(
        new Request("http://localhost/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            platform: "github",
            title: "GitHub",
            url: "https://github.com/myuser",
            sortOrder: 1,
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.platform).toBe("github");
      expect(data.title).toBe("GitHub");
      expect(data.url).toBe("https://github.com/myuser");
      expect(data.sortOrder).toBe(1);

      contactId = data.id;
    });
  });

  describe("GET /contacts (after create)", () => {
    it("should return the created contact", async () => {
      const res = await app.handle(
        new Request("http://localhost/contacts")
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      const found = data.find((c: any) => c.id === contactId);
      expect(found).toBeDefined();
      expect(found.platform).toBe("github");
    });
  });

  describe("PUT /contacts/:id", () => {
    it("should update a contact", async () => {
      const res = await app.handle(
        new Request(`http://localhost/contacts/${contactId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: "My GitHub",
            url: "https://github.com/updated",
          }),
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.title).toBe("My GitHub");
      expect(data.url).toBe("https://github.com/updated");
      expect(data.platform).toBe("github");
    });

    it("should return 404 for non-existent contact", async () => {
      const res = await app.handle(
        new Request("http://localhost/contacts/non-existent-id", {
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

  describe("DELETE /contacts/:id", () => {
    it("should delete a contact", async () => {
      const res = await app.handle(
        new Request(`http://localhost/contacts/${contactId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Contact deleted successfully");
    });

    it("should return 404 after deletion", async () => {
      const res = await app.handle(
        new Request(`http://localhost/contacts/${contactId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );
      expect(res.status).toBe(404);
    });
  });
});
