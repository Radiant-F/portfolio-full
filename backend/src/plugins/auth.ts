import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const authPlugin = new Elysia({ name: "auth.plugin" })
  .use(
    jwt({
      name: "accessJwt",
      secret: process.env.JWT_ACCESS_SECRET!,
      exp: "15m",
    })
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: process.env.JWT_REFRESH_SECRET!,
      exp: "7d",
    })
  )
  .macro({
    isAuth(enabled: boolean) {
      if (!enabled) return {};

      return {
        async resolve({ cookie, headers, accessJwt, status }) {
          const cookieToken = cookie.access_token?.value;
          const headerToken = headers.authorization?.startsWith("Bearer ")
            ? headers.authorization.slice(7)
            : undefined;

          const token = cookieToken || headerToken;

          if (!token || typeof token !== "string") {
            return status(401, { message: "Unauthorized" });
          }

          const payload = await accessJwt.verify(token);

          if (!payload) {
            return status(401, { message: "Unauthorized" });
          }

          return {
            userId: payload.sub as string,
          };
        },
      };
    },
  });
