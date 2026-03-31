import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { TagService } from "./service";
import {
  createTagBody,
  updateTagBody,
  tagResponse,
  tagListResponse,
  notFoundError,
  conflictError,
  messageResponse,
} from "./model";

export const tagController = new Elysia({
  prefix: "/tags",
  tags: ["Tags"],
})
  .use(authPlugin)
  // --- Public endpoints ---
  .get(
    "/",
    async () => {
      return TagService.getAll();
    },
    {
      response: {
        200: tagListResponse,
      },
      detail: {
        summary: "List all tags",
        description: "Returns all tags ordered by name. Public endpoint.",
      },
    }
  )
  // --- Authenticated endpoints ---
  .post(
    "/",
    async ({ body, status }) => {
      const existing = await TagService.getByName(body.name);
      if (existing) {
        return status(409, { message: "Tag with this name already exists" });
      }

      return TagService.create(body);
    },
    {
      isAuth: true,
      body: createTagBody,
      response: {
        200: tagResponse,
        409: conflictError,
      },
      detail: {
        summary: "Create tag",
        description:
          "Create a new tag. Returns 409 if a tag with the same name already exists.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      if (body.name) {
        const existing = await TagService.getByName(body.name);
        if (existing && existing.id !== params.id) {
          return status(409, { message: "Tag with this name already exists" });
        }
      }

      const tag = await TagService.update(params.id, body);
      if (!tag) {
        return status(404, { message: "Tag not found" });
      }
      return tag;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateTagBody,
      response: {
        200: tagResponse,
        404: notFoundError,
        409: conflictError,
      },
      detail: {
        summary: "Update tag",
        description:
          "Update a tag name. Returns 409 if name conflicts with another tag.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const deleted = await TagService.delete(params.id);
      if (!deleted) {
        return status(404, { message: "Tag not found" });
      }
      return { message: "Tag deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete tag",
        description:
          "Delete a tag. Cascade-removes all associations with works.",
        security: [{ bearerAuth: [] }],
      },
    }
  );
