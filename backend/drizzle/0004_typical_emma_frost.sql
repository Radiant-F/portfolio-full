DELETE FROM "about";--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "title" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "title_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "content_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "sort_order" integer DEFAULT 0 NOT NULL;
