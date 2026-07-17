import { describe, expect, it, beforeAll } from "bun:test";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "../src/modules/auth";
import { seedDefaultUser } from "../src/database/seed";

const app = new Elysia().use(cors()).use(authController);

const TEST_USERNAME = process.env.DEFAULT_USER_USERNAME!;
const TEST_PASSPHRASE = process.env.DEFAULT_USER_PASSPHRASE!;

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
            username: TEST_USERNAME,
            passphrase: TEST_PASSPHRASE,
          }),
        })
      );

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.accessToken).toBeString();
      expect(data.refreshToken).toBeString();
      expect(data.user.username).toBe(TEST_USERNAME);
      expect(data.user.id).toBeString();

      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    });

    it("should reject invalid passphrase", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: TEST_USERNAME,
            passphrase: "WrongPass1!",
          }),
        })
      );

      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.message).toBe("Invalid username or passphrase");
    });

    it("should reject non-existent username", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "nonexistent",
            passphrase: TEST_PASSPHRASE,
          }),
        })
      );

      expect(res.status).toBe(401);
    });

    it("should reject username shorter than 5 characters", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "abc",
            passphrase: TEST_PASSPHRASE,
          }),
        })
      );

      expect(res.status).toBe(422);
    });

    it("should reject passphrase without an uppercase letter", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: TEST_USERNAME,
            passphrase: "lower1!",
          }),
        })
      );

      expect(res.status).toBe(422);
    });

    it("should reject passphrase shorter than 8 characters", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: TEST_USERNAME,
            passphrase: "Ab1!",
          }),
        })
      );

      expect(res.status).toBe(422);
    });

    it("should reject passphrase containing a forbidden plus sign", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: TEST_USERNAME,
            passphrase: "Abcdef1+",
          }),
        })
      );

      expect(res.status).toBe(422);
    });

    it("should reject passphrase containing a forbidden backtick", async () => {
      const res = await app.handle(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: TEST_USERNAME,
            passphrase: "Abcdef1`",
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
      expect(data.username).toBe(TEST_USERNAME);
      expect(data.id).toBeString();
    });

    it("should return 401 without token", async () => {
      const res = await app.handle(new Request("http://localhost/auth/me"));

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
      expect(data.user.username).toBe(TEST_USERNAME);

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
