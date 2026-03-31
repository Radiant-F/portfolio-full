import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { authController } from "./modules/auth";
import { skillController } from "./modules/skill";
import { experienceController } from "./modules/experience";
import { tagController } from "./modules/tag";
import { workController } from "./modules/work";
import { contactController } from "./modules/contact";
import { seedDefaultUser } from "./database/seed";

const app = new Elysia()
  .use(cors())
  .use(
    openapi({
      documentation: {
        info: {
          title: "Portfolio CMS API",
          version: "1.0.0",
          description: "Backend API for portfolio content management",
        },
        tags: [
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Skills", description: "Skills CRUD endpoints" },
          { name: "Experiences", description: "Experiences CRUD endpoints" },
          { name: "Tags", description: "Tags CRUD endpoints" },
          { name: "Works", description: "Works CRUD endpoints" },
          { name: "Contacts", description: "Contacts CRUD endpoints" },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  )
  .get("/", () => "Hello Elysia", { detail: { hide: true } })
  .use(authController)
  .use(skillController)
  .use(experienceController)
  .use(tagController)
  .use(workController)
  .use(contactController)
  .listen(3000);

seedDefaultUser().catch(console.error);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
