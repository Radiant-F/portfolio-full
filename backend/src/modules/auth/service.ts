import { eq } from "drizzle-orm";
import { db } from "../../database";
import { users } from "../../database/schema";

export abstract class AuthService {
  static async login(email: string, password: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) return null;

    const valid = await Bun.password.verify(password, user.password);

    if (!valid) return null;

    return { id: user.id, email: user.email };
  }

  static async getUserById(id: string) {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user ?? null;
  }

  static async hashPassword(password: string) {
    return Bun.password.hash(password, "argon2id");
  }

  static async verifyPassword(password: string, hash: string) {
    return Bun.password.verify(password, hash);
  }
}
