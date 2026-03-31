import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { ContactService } from "./service";
import {
  createContactBody,
  updateContactBody,
  contactResponse,
  contactListResponse,
  notFoundError,
  messageResponse,
} from "./model";

export const contactController = new Elysia({
  prefix: "/contacts",
  tags: ["Contacts"],
})
  .use(authPlugin)
  // --- Public endpoints ---
  .get(
    "/",
    async () => {
      return ContactService.getAll();
    },
    {
      response: {
        200: contactListResponse,
      },
      detail: {
        summary: "List all contacts",
        description:
          "Returns all contacts ordered by sortOrder. Public endpoint.",
      },
    }
  )
  // --- Authenticated endpoints ---
  .post(
    "/",
    async ({ body }) => {
      return ContactService.create(body);
    },
    {
      isAuth: true,
      body: createContactBody,
      response: {
        200: contactResponse,
      },
      detail: {
        summary: "Create contact",
        description:
          "Create a new contact entry (social link, email, etc.).",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .put(
    "/:id",
    async ({ params, body, status }) => {
      const contact = await ContactService.update(params.id, body);
      if (!contact) {
        return status(404, { message: "Contact not found" });
      }
      return contact;
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      body: updateContactBody,
      response: {
        200: contactResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Update contact",
        description: "Update an existing contact entry.",
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    "/:id",
    async ({ params, status }) => {
      const deleted = await ContactService.delete(params.id);
      if (!deleted) {
        return status(404, { message: "Contact not found" });
      }
      return { message: "Contact deleted successfully" };
    },
    {
      isAuth: true,
      params: t.Object({ id: t.String() }),
      response: {
        200: messageResponse,
        404: notFoundError,
      },
      detail: {
        summary: "Delete contact",
        description: "Delete a contact entry.",
        security: [{ bearerAuth: [] }],
      },
    }
  );
