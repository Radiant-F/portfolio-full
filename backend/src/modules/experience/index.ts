import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { ExperienceService } from "./service";
import { CloudinaryService } from "../upload/service";
import { resolveTranslation } from "../../services/translation";
import {
  createExperienceBody,
  updateExperienceBody,
  experienceResponse,
  experienceListResponse,
  createAchievementBody,
  updateAchievementBody,
  updateExperienceTranslationBody,
  updateAchievementTranslationBody,
  achievementResponse,
  notFoundError,
  messageResponse,
} from "./model";

export const experienceController = new Elysia({
  prefix: "/experiences",
  tags: ["Experiences"],
})
  .use(authPlugin)
  // --- Public endpoints ---
  .get(
    "/",
    async ({ query }) => {
      const allExperiences = await ExperienceService.getAll();
      return allExperiences.map((exp) => ({
        ...exp,
        responsibility: resolveTranslation(
          exp.responsibility,
          exp.responsibilityI18n,
          query.lang,
        ),
        achievements: exp.achievements.map((a) => ({
          ...a,
          description: resolveTranslation(
            a.description,
            a.descriptionI18n,
            query.lang,
          ),
        })),
      }));
    },
    {
      query: t.Object({ lang: t.Optional(t.String()) }),
      response: {
        200: experienceListResponse,
      },
      detail: {
        summary: "List all experiences",
        description:
          "Returns all experiences with their achievements, ordered by sortOrder. Accepts optional `lang` query param (ar, id, cn, jp, ru) to return translated text. Public endpoint.",
      },
    },
  )
  .get(
    "/:id",
    async ({ params, query, status }) => {
      const exp = await ExperienceService.getById(params.id);
      if (!exp) {
        return status(404, { message: "Experience not found" });
      }
      return {
        ...exp,
        responsibility: resolveTranslation(
          exp.responsibility,
          exp.responsibilityI18n,
          query.lang,
        ),
        achievements: exp.achievements.map((a) => ({
          ...a,
          description: resolveTranslation(
            a.description,
            a.descriptionI18n,
            query.lang,
          ),
        })),
      };
    },
    {
      params: t.Object({ id: t.String() }),
      query: t.Object({ lang: t.Optional(t.String()) }),
      response: {
        200: experienceResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Get experience by ID",
        description:
          "Returns a single experience with its achievements. Accepts optional `lang` query param to return translated text. Public endpoint.",
      },
    },
  )
  // --- Authenticated endpoints ---
  .post(
    "/",
    async ({ body }) => {
      const companyLogoUrl = await CloudinaryService.uploadImage(
        body.companyLogo,
        "portfolio/experiences",
      );
      return ExperienceService.create({
        companyTitle: body.companyTitle,
        companyLogoUrl,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        position: body.position,
        responsibility: body.responsibility,
        sortOrder: body.sortOrder,
      });
    },
    {
      isAuth: true,
      body: createExperienceBody,
      response: {
        200: experienceResponse,
      },
      detail: {
        summary: "Create experience",
        description:
          "Create a new experience entry. Accepts multipart form with company logo file upload.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      let companyLogoUrl: string | undefined;

      if (body.companyLogo) {
        const existing = await ExperienceService.getById(params.id);
        if (!existing) {
          return status(404, { message: "Experience not found" });
        }

        companyLogoUrl = await CloudinaryService.uploadImage(
          body.companyLogo,
          "portfolio/experiences",
        );

        // Delete old logo from Cloudinary
        const oldPublicId = CloudinaryService.extractPublicId(
          existing.companyLogoUrl,
        );
        if (oldPublicId) {
          CloudinaryService.deleteImage(oldPublicId).catch(console.error);
        }
      }

      const exp = await ExperienceService.update(params.id, {
        companyTitle: body.companyTitle,
        companyLogoUrl,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate:
          body.endDate !== undefined ? new Date(body.endDate) : undefined,
        position: body.position,
        responsibility: body.responsibility,
        sortOrder: body.sortOrder,
      });
      if (!exp) {
        return status(404, { message: "Experience not found" });
      }
      return exp;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateExperienceBody,
      response: {
        200: experienceResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update experience",
        description:
          "Update an existing experience. If companyLogo is provided, replaces the old logo on Cloudinary.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const deleted = await ExperienceService.delete(params.id);
      if (!deleted) {
        return status(404, { message: "Experience not found" });
      }

      // Clean up Cloudinary image
      const publicId = CloudinaryService.extractPublicId(
        deleted.companyLogoUrl,
      );
      if (publicId) {
        CloudinaryService.deleteImage(publicId).catch(console.error);
      }

      return { message: "Experience deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete experience",
        description:
          "Delete an experience, its achievements (cascade), and its Cloudinary logo.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Achievements ---
  .post(
    "/:id/achievements",
    async ({ params, body, status }) => {
      const achievement = await ExperienceService.addAchievement(
        params.id,
        body,
      );
      if (!achievement) {
        return status(404, { message: "Experience not found" });
      }
      return achievement;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: createAchievementBody,
      response: {
        200: achievementResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Add achievement",
        description: "Add an achievement entry to an experience.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .put(
    "/:id/achievements/:achievementId",
    async ({ params, body, status }) => {
      const achievement = await ExperienceService.updateAchievement(
        params.achievementId,
        body,
      );
      if (!achievement) {
        return status(404, { message: "Achievement not found" });
      }
      return achievement;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), achievementId: t.String() }),
      body: updateAchievementBody,
      response: {
        200: achievementResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update achievement",
        description: "Update a specific achievement entry.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .delete(
    "/:id/achievements/:achievementId",
    async ({ params, status }) => {
      const deleted = await ExperienceService.deleteAchievement(
        params.achievementId,
      );
      if (!deleted) {
        return status(404, { message: "Achievement not found" });
      }
      return { message: "Achievement deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), achievementId: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete achievement",
        description: "Delete a specific achievement entry.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Translations ---
  .patch(
    "/:id/translations",
    async ({ params, body, status }) => {
      const exp = await ExperienceService.updateTranslations(
        params.id,
        body.lang,
        body.responsibility,
      );
      if (!exp) {
        return status(404, { message: "Experience not found" });
      }
      return exp;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateExperienceTranslationBody,
      response: {
        200: experienceResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Override experience translation",
        description:
          "Manually override the responsibility translation for a specific language. Only the specified language is updated.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .patch(
    "/:id/achievements/:achievementId/translations",
    async ({ params, body, status }) => {
      const achievement = await ExperienceService.updateAchievementTranslations(
        params.id,
        params.achievementId,
        body.lang,
        body.description,
      );
      if (!achievement) {
        return status(404, { message: "Achievement not found" });
      }
      return achievement;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), achievementId: t.String() }),
      body: updateAchievementTranslationBody,
      response: {
        200: achievementResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Override achievement translation",
        description:
          "Manually override the description translation for a specific language. Only the specified language is updated.",
        security: [{ bearerAuth: [] }],
      },
    },
  );
