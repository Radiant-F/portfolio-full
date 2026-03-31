import { Elysia } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { AboutService } from "./service";
import {
  upsertAboutBody,
  aboutResponse,
  aboutGetResponse,
} from "./model";

export const aboutController = new Elysia({
  prefix: "/about",
  tags: ["About"],
})
  .use(authPlugin)
  // --- Public endpoint ---
  .get(
    "/",
    async () => {
      const about = await AboutService.get();
      if (!about) {
        return { content: null };
      }
      return about;
    },
    {
      response: {
        200: aboutGetResponse,
      },
      detail: {
        summary: "Get about content",
        description:
          "Returns the about me content. Returns { content: null } if no content exists yet.",
      },
    }
  )
  // --- Authenticated endpoint ---
  .put(
    "/",
    async ({ body }) => {
      return AboutService.upsert(body.content);
    },
    {
      isAuth: true,
      body: upsertAboutBody,
      response: {
        200: aboutResponse,
      },
      detail: {
        summary: "Update about content",
        description:
          "Create or update the about me content. HTML is sanitized before storage.",
        security: [{ bearerAuth: [] }],
      },
    }
  );
