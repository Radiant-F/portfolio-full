-- Rename users.email -> username (auth now uses username + passphrase).
-- users table only holds the seeded admin account, which seedDefaultUser recreates,
-- so a plain rename is safe. The unique constraint keeps enforcing uniqueness.
ALTER TABLE "users" RENAME COLUMN "email" TO "username";--> statement-breakpoint
ALTER TABLE "users" RENAME CONSTRAINT "users_email_unique" TO "users_username_unique";
