import { t } from "elysia";

export const loginBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 1 }),
});
export type LoginBody = typeof loginBody.static;

export const authResponse = t.Object({
  accessToken: t.String(),
  refreshToken: t.String(),
  user: t.Object({
    id: t.String(),
    email: t.String(),
  }),
});
export type AuthResponse = typeof authResponse.static;

export const meResponse = t.Object({
  id: t.String(),
  email: t.String(),
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
  message: t.Literal("Invalid email or password"),
});
