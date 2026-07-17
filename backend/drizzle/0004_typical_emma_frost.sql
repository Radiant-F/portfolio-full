-- About module reworked from a single HTML blob into a collection of items.
-- Existing about data is intentionally dropped (content shape changed).
DELETE FROM "about";--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "title" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "title_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "content_i18n" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "sort_order" integer DEFAULT 0 NOT NULL;