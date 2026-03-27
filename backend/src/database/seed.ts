import { eq, count } from "drizzle-orm";
import { db } from "./index";
import { users } from "./schema";

export async function seedDefaultUser() {
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;

  if (!email || !password) {
    console.log("⚠️ DEFAULT_USER_EMAIL or DEFAULT_USER_PASSWORD not set, skipping seed");
    return;
  }

  const [result] = await db.select({ total: count() }).from(users);

  if (result.total > 0) {
    console.log("✅ Users already exist, skipping seed");
    return;
  }

  const hashedPassword = await Bun.password.hash(password, "argon2id");

  await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  console.log(`✅ Default user seeded: ${email}`);
}
