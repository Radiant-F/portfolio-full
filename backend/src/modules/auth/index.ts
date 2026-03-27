import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { AuthService } from "./service";
import {
  loginBody,
  authResponse,
  meResponse,
  messageResponse,
  refreshBody,
  unauthorizedError,
  invalidCredentialsError,
} from "./model";

export const authController = new Elysia({
  prefix: "/auth",
  tags: ["Auth"],
})
  .use(authPlugin)
  .post(
    "/login",
    async ({ body, accessJwt, refreshJwt, cookie, status }) => {
      const user = await AuthService.login(body.email, body.password);

      if (!user) {
        return status(401, { message: "Invalid email or password" as const });
      }

      const accessToken = await accessJwt.sign({ sub: user.id });
      const refreshToken = await refreshJwt.sign({ sub: user.id });

      cookie.access_token.set({
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });

      cookie.refresh_token.set({
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return {
        accessToken,
        refreshToken,
        user,
      };
    },
    {
      body: loginBody,
      response: {
        200: authResponse,
        401: invalidCredentialsError,
      },
      detail: {
        summary: "Login",
        description: "Authenticate with email and password. Returns JWT tokens in both response body and httpOnly cookies.",
      },
    }
  )
  .post(
    "/logout",
    ({ cookie }) => {
      cookie.access_token.remove();
      cookie.refresh_token.remove();

      return { message: "Logged out successfully" };
    },
    {
      response: {
        200: messageResponse,
      },
      detail: {
        summary: "Logout",
        description: "Clear authentication cookies.",
      },
    }
  )
  .post(
    "/refresh",
    async ({ body, cookie, refreshJwt, accessJwt, status }) => {
      const token = cookie.refresh_token?.value || body.refreshToken;

      if (!token || typeof token !== "string") {
        return status(401, { message: "Unauthorized" as const });
      }

      const payload = await refreshJwt.verify(token);

      if (!payload || !payload.sub) {
        return status(401, { message: "Unauthorized" as const });
      }

      const userId = payload.sub as string;
      const accessToken = await accessJwt.sign({ sub: userId });
      const refreshToken = await refreshJwt.sign({ sub: userId });

      cookie.access_token.set({
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });

      cookie.refresh_token.set({
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      const user = await AuthService.getUserById(userId);

      if (!user) {
        return status(401, { message: "Unauthorized" as const });
      }

      return {
        accessToken,
        refreshToken,
        user,
      };
    },
    {
      body: refreshBody,
      response: {
        200: authResponse,
        401: unauthorizedError,
      },
      detail: {
        summary: "Refresh tokens",
        description: "Exchange a valid refresh token for new access and refresh tokens.",
      },
    }
  )
  .get(
    "/me",
    async ({ userId, status }) => {
      const user = await AuthService.getUserById(userId);

      if (!user) {
        return status(401, { message: "Unauthorized" as const });
      }

      return user;
    },
    {
      isAuth: true,
      response: {
        200: meResponse,
        401: unauthorizedError,
      },
      detail: {
        summary: "Get current user",
        description: "Returns the authenticated user's profile.",
        security: [{ bearerAuth: [] }],
      },
    }
  );
