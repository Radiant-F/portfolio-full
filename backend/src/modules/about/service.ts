import sanitizeHtml from "sanitize-html";
import { db } from "../../database";
import { about } from "../../database/schema";

export abstract class AboutService {
  private static sanitize(html: string): string {
    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "strong",
        "em",
        "u",
        "s",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "blockquote",
        "code",
        "pre",
        "br",
        "hr",
        "span",
        "div",
        "sub",
        "sup",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height"],
        "*": ["class"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });
  }

  static async get() {
    const [row] = await db.select().from(about).limit(1);
    return row ?? null;
  }

  static async upsert(content: string) {
    const sanitized = AboutService.sanitize(content);
    const existing = await AboutService.get();

    if (existing) {
      const [updated] = await db
        .update(about)
        .set({ content: sanitized })
        .returning();

      return updated;
    }

    const [created] = await db
      .insert(about)
      .values({ content: sanitized })
      .returning();

    return created;
  }
}
