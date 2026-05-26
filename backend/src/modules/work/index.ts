import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { WorkService } from "./service";
import { CloudinaryService } from "../upload/service";
import {
  createWorkBody,
  updateWorkBody,
  createWorkLinkBody,
  updateWorkLinkBody,
  createScreenshotBody,
  attachTagBody,
  bulkAddTagsBody,
  syncTagsBody,
  bulkScreenshotBody,
  reorderScreenshotsBody,
  workResponse,
  workListResponse,
  workLinkResponse,
  workScreenshotResponse,
  workScreenshotListResponse,
  workTagResponse,
  workTagListResponse,
  notFoundError,
  conflictError,
  messageResponse,
} from "./model";

export const workController = new Elysia({
  prefix: "/works",
  tags: ["Works"],
})
  .use(authPlugin)
  // --- Public endpoints ---
  .get(
    "/",
    async () => {
      return WorkService.getAll();
    },
    {
      response: {
        200: workListResponse,
      },
      detail: {
        summary: "List all works",
        description:
          "Returns all works with links, screenshots, and tags, ordered by sortOrder. Public endpoint.",
      },
    },
  )
  .get(
    "/screenshots/preview",
    async () => {
      return WorkService.getPreviewScreenshots();
    },
    {
      response: {
        200: workScreenshotListResponse,
      },
      detail: {
        summary: "Get work screenshot previews",
        description:
          "Returns up to 6 screenshots for the frontend preview carousel using round-robin selection across works. Public endpoint.",
      },
    },
  )
  .get(
    "/:id",
    async ({ params, status }) => {
      const work = await WorkService.getById(params.id);
      if (!work) {
        return status(404, { message: "Work not found" });
      }
      return work;
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: workResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Get work by ID",
        description:
          "Returns a single work with its links, screenshots, and tags. Public endpoint.",
      },
    },
  )
  // --- Authenticated work CRUD ---
  .post(
    "/",
    async ({ body }) => {
      const iconUrl = await CloudinaryService.uploadImage(
        body.icon,
        "portfolio/works",
      );
      return WorkService.create({
        title: body.title,
        description: body.description,
        iconUrl,
        sortOrder: body.sortOrder,
      });
    },
    {
      isAuth: true,
      body: createWorkBody,
      response: {
        200: workResponse,
      },
      detail: {
        summary: "Create work",
        description:
          "Create a new work entry. Accepts multipart form with icon file upload.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      let iconUrl: string | undefined;

      if (body.icon) {
        const existing = await WorkService.getById(params.id);
        if (!existing) {
          return status(404, { message: "Work not found" });
        }

        iconUrl = await CloudinaryService.uploadImage(
          body.icon,
          "portfolio/works",
        );

        const oldPublicId = CloudinaryService.extractPublicId(existing.iconUrl);
        if (oldPublicId) {
          CloudinaryService.deleteImage(oldPublicId).catch(console.error);
        }
      }

      const work = await WorkService.update(params.id, {
        title: body.title,
        description: body.description,
        iconUrl,
        sortOrder: body.sortOrder,
      });
      if (!work) {
        return status(404, { message: "Work not found" });
      }
      return work;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateWorkBody,
      response: {
        200: workResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update work",
        description:
          "Update an existing work. If icon is provided, replaces the old icon on Cloudinary.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      // Fetch screenshots before deletion for Cloudinary cleanup
      const screenshots = await WorkService.getScreenshotsByWorkId(params.id);

      const deleted = await WorkService.delete(params.id);
      if (!deleted) {
        return status(404, { message: "Work not found" });
      }

      // Clean up icon from Cloudinary
      const iconPublicId = CloudinaryService.extractPublicId(deleted.iconUrl);
      if (iconPublicId) {
        CloudinaryService.deleteImage(iconPublicId).catch(console.error);
      }

      // Clean up all screenshot images from Cloudinary
      for (const screenshot of screenshots) {
        const publicId = CloudinaryService.extractPublicId(screenshot.imageUrl);
        if (publicId) {
          CloudinaryService.deleteImage(publicId).catch(console.error);
        }
      }

      return { message: "Work deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete work",
        description:
          "Delete a work, its children (cascade), and all Cloudinary images (icon + screenshots).",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Links ---
  .post(
    "/:id/links",
    async ({ params, body, status }) => {
      const link = await WorkService.addLink(params.id, body);
      if (!link) {
        return status(404, { message: "Work not found" });
      }
      return link;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: createWorkLinkBody,
      response: {
        200: workLinkResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Add work link",
        description: "Add a resource link (GitHub, website, etc.) to a work.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .put(
    "/:id/links/:linkId",
    async ({ params, body, status }) => {
      const link = await WorkService.updateLink(params.linkId, body);
      if (!link) {
        return status(404, { message: "Link not found" });
      }
      return link;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), linkId: t.String() }),
      body: updateWorkLinkBody,
      response: {
        200: workLinkResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update work link",
        description: "Update a specific link entry.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .delete(
    "/:id/links/:linkId",
    async ({ params, status }) => {
      const deleted = await WorkService.deleteLink(params.linkId);
      if (!deleted) {
        return status(404, { message: "Link not found" });
      }
      return { message: "Link deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), linkId: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete work link",
        description: "Delete a specific link entry.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Screenshots ---
  .post(
    "/:id/screenshots",
    async ({ params, body, status }) => {
      const imageUrl = await CloudinaryService.uploadImage(
        body.image,
        "portfolio/works/screenshots",
      );
      const screenshot = await WorkService.addScreenshot(
        params.id,
        imageUrl,
        body.sortOrder,
      );
      if (!screenshot) {
        return status(404, { message: "Work not found" });
      }
      return screenshot;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: createScreenshotBody,
      response: {
        200: workScreenshotResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Add work screenshot",
        description:
          "Upload a screenshot image for a work. Stored on Cloudinary.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .delete(
    "/:id/screenshots/:screenshotId",
    async ({ params, status }) => {
      const deleted = await WorkService.deleteScreenshot(params.screenshotId);
      if (!deleted) {
        return status(404, { message: "Screenshot not found" });
      }

      // Clean up Cloudinary image
      const publicId = CloudinaryService.extractPublicId(deleted.imageUrl);
      if (publicId) {
        CloudinaryService.deleteImage(publicId).catch(console.error);
      }

      return { message: "Screenshot deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), screenshotId: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete work screenshot",
        description: "Delete a screenshot and its Cloudinary image.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Tag Attachments ---
  .post(
    "/:id/tags",
    async ({ params, body, status }) => {
      const result = await WorkService.addTag(params.id, body.tagId);

      if ("error" in result) {
        if (result.error === "duplicate") {
          return status(409, {
            message: "Tag is already attached to this work",
          });
        }
        return status(404, { message: result.error as string });
      }

      return result.tag;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: attachTagBody,
      response: {
        200: workTagResponse,
        404: notFoundError,
        409: conflictError,
      },
      detail: {
        summary: "Attach tag to work",
        description:
          "Attach an existing tag to a work. Returns 409 if already attached.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .delete(
    "/:id/tags/:tagId",
    async ({ params, status }) => {
      const deleted = await WorkService.removeTag(params.id, params.tagId);
      if (!deleted) {
        return status(404, { message: "Tag association not found" });
      }
      return { message: "Tag detached successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String(), tagId: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Detach tag from work",
        description: "Remove a tag association from a work.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Bulk Tags ---
  .post(
    "/:id/tags/bulk",
    async ({ params, body, status }) => {
      const result = await WorkService.bulkAddTags(params.id, body.tagIds);

      if ("error" in result) {
        if (result.error === "One or more tags not found") {
          return status(404, { message: result.error });
        }
        return status(404, { message: result.error as string });
      }

      return result.tags;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: bulkAddTagsBody,
      response: {
        200: workTagListResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Bulk add tags to work",
        description:
          "Attach multiple tags at once. Skips already-attached tags. Returns all current tags.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .put(
    "/:id/tags",
    async ({ params, body, status }) => {
      const result = await WorkService.syncTags(params.id, body.tagIds);

      if ("error" in result) {
        if (result.error === "One or more tags not found") {
          return status(404, { message: result.error });
        }
        return status(404, { message: result.error as string });
      }

      return result.tags;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: syncTagsBody,
      response: {
        200: workTagListResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Sync tags on work",
        description:
          "Replace all tag associations with the provided set. Pass empty array to remove all tags.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  // --- Bulk Screenshots ---
  .post(
    "/:id/screenshots/bulk",
    async ({ params, body, status }) => {
      const items: { imageUrl: string; sortOrder: number }[] = [];

      for (let i = 0; i < body.images.length; i++) {
        const imageUrl = await CloudinaryService.uploadImage(
          body.images[i],
          "portfolio/works/screenshots",
        );
        items.push({ imageUrl, sortOrder: i });
      }

      const screenshots = await WorkService.bulkAddScreenshots(
        params.id,
        items,
      );
      if (!screenshots) {
        return status(404, { message: "Work not found" });
      }

      return screenshots;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: bulkScreenshotBody,
      response: {
        200: workScreenshotListResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Bulk add screenshots",
        description:
          "Upload multiple screenshot images at once. Stored on Cloudinary.",
        security: [{ bearerAuth: [] }],
      },
    },
  )
  .put(
    "/:id/screenshots/reorder",
    async ({ params, body, status }) => {
      const screenshots = await WorkService.reorderScreenshots(
        params.id,
        body.items,
      );
      if (!screenshots) {
        return status(404, { message: "Work not found" });
      }
      return screenshots;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: reorderScreenshotsBody,
      response: {
        200: workScreenshotListResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Reorder screenshots",
        description:
          "Update sortOrder for multiple screenshots in a single request.",
        security: [{ bearerAuth: [] }],
      },
    },
  );
