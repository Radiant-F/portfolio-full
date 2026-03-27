import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { SkillService } from "./service";
import { CloudinaryService } from "../upload/service";
import {
  createSkillBody,
  updateSkillBody,
  skillResponse,
  skillListResponse,
  createDetailBody,
  updateDetailBody,
  detailResponse,
  notFoundError,
  messageResponse,
} from "./model";

export const skillController = new Elysia({
  prefix: "/skills",
  tags: ["Skills"],
})
  .use(authPlugin)
  // --- Public endpoints ---
  .get(
    "/",
    async () => {
      return SkillService.getAll();
    },
    {
      response: {
        200: skillListResponse,
      },
      detail: {
        summary: "List all skills",
        description:
          "Returns all skills with their details, ordered by sortOrder. Public endpoint.",
      },
    }
  )
  .get(
    "/:id",
    async ({ params, status }) => {
      const skill = await SkillService.getById(params.id);
      if (!skill) {
        return status(404, { message: "Skill not found" });
      }
      return skill;
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: skillResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Get skill by ID",
        description:
          "Returns a single skill with its details. Public endpoint.",
      },
    }
  )
  // --- Authenticated endpoints ---
  .post(
    "/",
    async ({ body, status }) => {
      const imageUrl = await CloudinaryService.uploadImage(body.image);
      return SkillService.create({
        title: body.title,
        imageUrl,
        sortOrder: body.sortOrder,
      });
    },
    {
      isAuth: true,
      body: createSkillBody,
      response: {
        200: skillResponse,
      },
      detail: {
        summary: "Create skill",
        description:
          "Create a new skill entry. Accepts multipart form with image file upload.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      let imageUrl: string | undefined;

      if (body.image) {
        // Fetch existing skill to get old image URL for cleanup
        const existing = await SkillService.getById(params.id);
        if (!existing) {
          return status(404, { message: "Skill not found" });
        }

        imageUrl = await CloudinaryService.uploadImage(body.image);

        // Delete old image from Cloudinary
        const oldPublicId = CloudinaryService.extractPublicId(
          existing.imageUrl
        );
        if (oldPublicId) {
          CloudinaryService.deleteImage(oldPublicId).catch(console.error);
        }
      }

      const skill = await SkillService.update(params.id, {
        title: body.title,
        imageUrl,
        sortOrder: body.sortOrder,
      });
      if (!skill) {
        return status(404, { message: "Skill not found" });
      }
      return skill;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateSkillBody,
      response: {
        200: skillResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update skill",
        description:
          "Update an existing skill. If image is provided, replaces the old image on Cloudinary.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const deleted = await SkillService.delete(params.id);
      if (!deleted) {
        return status(404, { message: "Skill not found" });
      }

      // Clean up Cloudinary image
      const publicId = CloudinaryService.extractPublicId(deleted.imageUrl);
      if (publicId) {
        CloudinaryService.deleteImage(publicId).catch(console.error);
      }

      return { message: "Skill deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete skill",
        description:
          "Delete a skill, its details (cascade), and its Cloudinary image.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  // --- Skill Details ---
  .post(
    "/:id/details",
    async ({ params, body, status }) => {
      const detail = await SkillService.addDetail(params.id, body);
      if (!detail) {
        return status(404, { message: "Skill not found" });
      }
      return detail;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: createDetailBody,
      response: {
        200: detailResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Add skill detail",
        description: "Add a name/description detail entry to a skill.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id/details/:detailId",
    async ({ params, body, status }) => {
      const detail = await SkillService.updateDetail(params.detailId, body);
      if (!detail) {
        return status(404, { message: "Detail not found" });
      }
      return detail;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), detailId: t.String() }),
      body: updateDetailBody,
      response: {
        200: detailResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update skill detail",
        description: "Update a specific detail entry.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id/details/:detailId",
    async ({ params, status }) => {
      const deleted = await SkillService.deleteDetail(params.detailId);
      if (!deleted) {
        return status(404, { message: "Detail not found" });
      }
      return { message: "Detail deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), detailId: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete skill detail",
        description: "Delete a specific detail entry.",
        security: [{ bearerAuth: [] }],
      },
    }
  );
