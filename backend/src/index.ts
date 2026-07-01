import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { authController } from "./modules/auth";
import { skillController } from "./modules/skill";
import { experienceController } from "./modules/experience";
import { tagController } from "./modules/tag";
import { workController } from "./modules/work";
import { contactController } from "./modules/contact";
import { aboutController } from "./modules/about";
import { seedDefaultUser } from "./database/seed";
import { seedDemoData } from "./database/seed";
import { migrateDatabase } from "./database/migrate";
import { shouldSeedOnBoot } from "./database/seedConfig";

const port = Number(process.env.PORT ?? 3000);
const seedOnBoot = shouldSeedOnBoot(process.env.SEED_ON_BOOT);

function buildApp() {
  return new Elysia()
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
            { name: "About", description: "About me content endpoint" },
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
      }),
    )
    .get(
      "/",
      () => "Hey there, cutie. Documentation is available at /openapi.",
      {
        detail: { hide: true },
      },
    )
    .use(authController)
    .use(skillController)
    .use(experienceController)
    .use(tagController)
    .use(workController)
    .use(contactController)
    .use(aboutController);
}

async function bootstrap() {
  await migrateDatabase();
  console.log("🗃️ Database migrations checked");

  const app = buildApp().listen(port);

  if (seedOnBoot) {
    seedDefaultUser().catch(console.error);
    seedDemoData().catch(console.error);
  } else {
    console.log("🌱 Seed on boot is disabled");
  }

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

bootstrap().catch((error) => {
  console.error("❌ Failed to bootstrap server", error);
  process.exit(1);
});

export type App = ReturnType<typeof buildApp>;
