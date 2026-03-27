import { describe, expect, it, beforeAll } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { seedDefaultUser } from "../src/database/seed";

const app = new Elysia().use(cors()).use(authController);

const TEST_EMAIL = process.env.DEFAULT_USER_EMAIL!;
const TEST_PASSWORD = process.env.DEFAULT_USER_PASSWORD!;

beforeAll(async () => {
  await seedDefaultUser();
});

describe("Auth Endpoints", () => {
  let accessToken: string;
  let refreshToken: string;

  describe("POST /auth/login", () => {
    it("should login with valid credentials", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
          }),
        })
      );

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.accessToken).toBeString();
      expect(data.refreshToken).toBeString();
      expect(data.user.email).toBe(TEST_EMAIL);
      expect(data.user.id).toBeString();

      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    });

    it("should reject invalid password", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: TEST_EMAIL,
            password: "wrong-password",
          }),
        })
      );

      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.message).toBe("Invalid email or password");
    });

    it("should reject non-existent email", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "nonexistent@example.com",
            password: "whatever",
          }),
        })
      );

      expect(res.status).toBe(401);
    });

    it("should reject invalid email format", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "not-an-email",
            password: "whatever",
          }),
        })
      );

      expect(res.status).toBe(422);
    });
  });

  describe("GET /auth/me", () => {
    it("should return user with valid bearer token", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.email).toBe(TEST_EMAIL);
      expect(data.id).toBeString();
    });

    it("should return 401 without token", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/me")
      );

      expect(res.status).toBe(401);
    });

    it("should return 401 with invalid token", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/me", {
          headers: { Authorization: "Bearer invalid-token" },
        })
      );

      expect(res.status).toBe(401);
    });
  });

  describe("POST /auth/refresh", () => {
    it("should refresh tokens with valid refresh token in body", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
      );

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.accessToken).toBeString();
      expect(data.refreshToken).toBeString();
      expect(data.user.email).toBe(TEST_EMAIL);

      // Update tokens for subsequent tests
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    });

    it("should reject invalid refresh token", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: "invalid-token" }),
        })
      );

      expect(res.status).toBe(401);
    });
  });

  describe("POST /auth/logout", () => {
    it("should logout successfully", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/logout", {
          method: "POST",
        })
      );

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.message).toBe("Logged out successfully");
    });
  });
});
