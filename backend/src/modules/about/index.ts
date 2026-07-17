import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { AboutService } from "./service";
import {
  createAboutBody,
  updateAboutBody,
  aboutResponse,
  aboutListResponse,
  notFoundError,
  messageResponse,
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
      return AboutService.getAll();
    },
    {
      response: {
        200: aboutListResponse,
      },
      detail: {
        summary: "List about items",
        description:
          "Returns all about items as an array, ordered by sortOrder. Each item has a title and content (plain strings), plus optional manual translations. Public endpoint.",
      },
    }
  )
  // --- Authenticated endpoints ---
  .post(
    "/",
    async ({ body }) => {
      return AboutService.create(body);
    },
    {
      isAuth: true,
      body: createAboutBody,
      response: {
        200: aboutResponse,
      },
      detail: {
        summary: "Create about item",
        description: "Add a new about item.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      const item = await AboutService.update(params.id, body);
      if (!item) {
        return status(404, { message: "About item not found" });
      }
      return item;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateAboutBody,
      response: {
        200: aboutResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update about item",
        description: "Update an existing about item by ID.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const deleted = await AboutService.delete(params.id);
      if (!deleted) {
        return status(404, { message: "About item not found" });
      }
      return { message: "About item deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete about item",
        description: "Delete an about item by ID.",
        security: [{ bearerAuth: [] }],
      },
    }
  );
