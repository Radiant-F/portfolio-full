import { eq } from "drizzle-orm";
import { db } from "../../database";
import { users } from "../../database/schema";

export abstract class AuthService {
  static async login(username: string, passphrase: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) return null;

    const valid = await Bun.password.verify(passphrase, user.password);

    if (!valid) return null;

    return { id: user.id, username: user.username };
  }

  static async getUserById(id: string) {
    const [user] = await db
      .select({
        id: users.id,
        username: users.username,
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
