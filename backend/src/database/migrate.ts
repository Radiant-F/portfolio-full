import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

export async function migrateDatabase() {
  await migrate(db, { migrationsFolder: "./drizzle" });
}
