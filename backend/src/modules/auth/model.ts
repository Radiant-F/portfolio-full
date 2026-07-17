import { t } from "elysia";

// ─── Passphrase policy ─────────────────────────────────────
// - min 8 characters
// - at least one uppercase, one lowercase, one digit, one special symbol
// - no forbidden symbols: backtick (`) or plus sign (+)
// Allowed special symbols (excludes ` and +):
//   ! @ # $ % ^ & * ( ) - _ = { } [ ] | \ : ; " ' < > , . ? / ~
const PASSPHRASE_PATTERN =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_={}\\[\\]|\\\\:;\"'<>,.?/~])[^`+]{8,}$";

export const usernameSchema = t.String({
  minLength: 5,
  description: "Username, minimum 5 characters.",
});

export const passphraseSchema = t.String({
  minLength: 8,
  pattern: PASSPHRASE_PATTERN,
  description:
    "Passphrase: min 8 chars, must include uppercase, lowercase, number and a special symbol. Backtick (`) and plus (+) are not allowed.",
});

export const loginBody = t.Object({
  username: usernameSchema,
  passphrase: passphraseSchema,
});
export type LoginBody = typeof loginBody.static;

export const authResponse = t.Object({
  accessToken: t.String(),
  refreshToken: t.String(),
  user: t.Object({
    id: t.String(),
    username: t.String(),
  }),
});
export type AuthResponse = typeof authResponse.static;

export const meResponse = t.Object({
  id: t.String(),
  username: t.String(),
});
export type MeResponse = typeof meResponse.static;

export const messageResponse = t.Object({
  message: t.String(),
});
export type MessageResponse = typeof messageResponse.static;

export const refreshBody = t.Object({
  refreshToken: t.Optional(t.String()),
});
export type RefreshBody = typeof refreshBody.static;

export const unauthorizedError = t.Object({
  message: t.Literal("Unauthorized"),
});

export const invalidCredentialsError = t.Object({
  message: t.Literal("Invalid username or passphrase"),
});
