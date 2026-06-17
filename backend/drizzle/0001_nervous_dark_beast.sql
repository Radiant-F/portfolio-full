CREATE TABLE "about" (
	"id" varchar PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experience_achievements" ADD COLUMN "description_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "responsibility_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "skill_details" ADD COLUMN "description_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "works" ADD COLUMN "description_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;