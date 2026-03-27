import { describe, expect, it } from "bun:test";
import { AuthService } from "../src/modules/auth/service";

describe("AuthService", () => {
  describe("hashPassword / verifyPassword", () => {
    it("should hash and verify a password correctly", async () => {
      const password = "test-password-123";
      const hash = await AuthService.hashPassword(password);

      expect(hash).not.toBe(password);
      expect(hash.startsWith("$argon2id$")).toBe(true);

      const valid = await AuthService.verifyPassword(password, hash);
      expect(valid).toBe(true);
    });

    it("should reject an incorrect password", async () => {
      const hash = await AuthService.hashPassword("correct-password");
      const valid = await AuthService.verifyPassword("wrong-password", hash);

      expect(valid).toBe(false);
    });
  });
});
