ALTER TABLE "work_links" ADD COLUMN "platform" varchar(50) DEFAULT 'web' NOT NULL;--> statement-breakpoint
UPDATE "work_links"
SET "platform" = CASE
  WHEN "url" ILIKE '%github.com%' THEN 'github'
  WHEN "url" ILIKE '%play.google.com%' THEN 'play-store'
  WHEN "url" ILIKE '%apps.apple.com%' THEN 'app-store'
  WHEN LOWER("label") LIKE '%desktop%' THEN 'desktop'
  ELSE 'web'
END;--> statement-breakpoint