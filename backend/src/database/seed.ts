import { eq, count } from "drizzle-orm";
import { db } from "./index";
import {
  users,
  skills,
  skillDetails,
  experiences,
  experienceAchievements,
  tags,
  works,
  workLinks,
  workScreenshots,
  workTags,
  contacts,
} from "./schema";

// ─── Example data ─────────────────────────────────────────
import SEED_TAGS from "./seed/tags";
import SEED_CONTACTS from "./seed/contacts";
import SEED_SKILLS from "./seed/skills";
import SEED_EXPERIENCES from "./seed/experiences";
import SEED_WORKS from "./seed/works";

// ─── Seed functions ────────────────────────────────────────
export async function seedDefaultUser() {
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;

  if (!email || !password) {
    console.log(
      "⚠️ DEFAULT_USER_EMAIL or DEFAULT_USER_PASSWORD not set, skipping seed",
    );
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

export async function seedDemoData() {
  // Only seed if all content tables are empty
  const [contactCount] = await db.select({ total: count() }).from(contacts);
  const [tagCount] = await db.select({ total: count() }).from(tags);
  const [skillCount] = await db.select({ total: count() }).from(skills);
  const [experienceCount] = await db
    .select({ total: count() })
    .from(experiences);
  const [workCount] = await db.select({ total: count() }).from(works);

  const hasData =
    contactCount.total > 0 ||
    tagCount.total > 0 ||
    skillCount.total > 0 ||
    experienceCount.total > 0 ||
    workCount.total > 0;

  if (hasData) {
    console.log("✅ Demo data already exists, skipping seed");
    return;
  }

  console.log("🌱 Seeding demo data...");

  // Contacts
  await db.insert(contacts).values(
    SEED_CONTACTS.map((c) => ({
      platform: c.platform,
      title: c.title,
      url: c.url,
      sortOrder: c.sortOrder,
    })),
  );
  console.log(`  ✓ ${SEED_CONTACTS.length} contacts`);

  // Tags — store name→id map for work tag attachment
  const insertedTags = await db
    .insert(tags)
    .values(SEED_TAGS.map((name) => ({ name })))
    .returning({ id: tags.id, name: tags.name });

  const tagByName = new Map(insertedTags.map((t) => [t.name, t.id]));
  console.log(`  ✓ ${insertedTags.length} tags`);

  // Skills + details
  for (const s of SEED_SKILLS) {
    const [skill] = await db
      .insert(skills)
      .values({
        title: s.title,
        imageUrl: s.imageUrl,
        sortOrder: s.sortOrder,
      })
      .returning({ id: skills.id });

    if (s.details.length > 0) {
      await db.insert(skillDetails).values(
        s.details.map((d) => ({
          skillId: skill.id,
          name: d.name,
          description: d.description,
          descriptionI18n: d.descriptionI18n,
          sortOrder: d.sortOrder,
        })),
      );
    }
  }
  console.log(`  ✓ ${SEED_SKILLS.length} skills`);

  // Experiences + achievements
  for (const e of SEED_EXPERIENCES) {
    const [exp] = await db
      .insert(experiences)
      .values({
        companyTitle: e.companyTitle,
        companyLogoUrl: e.companyLogoUrl,
        startDate: e.startDate,
        endDate: e.endDate,
        position: e.position,
        responsibility: e.responsibility,
        responsibilityI18n: e.responsibilityI18n,
        sortOrder: e.sortOrder,
      })
      .returning({ id: experiences.id });

    if (e.achievements.length > 0) {
      await db.insert(experienceAchievements).values(
        e.achievements.map((a) => ({
          experienceId: exp.id,
          description: a.description,
          descriptionI18n: a.descriptionI18n,
          sortOrder: a.sortOrder,
        })),
      );
    }
  }
  console.log(`  ✓ ${SEED_EXPERIENCES.length} experiences`);

  // Works + links + screenshots + tags
  for (const w of SEED_WORKS) {
    const [work] = await db
      .insert(works)
      .values({
        title: w.title,
        description: w.description,
        descriptionI18n: w.descriptionI18n,
        iconUrl: w.iconUrl,
        sortOrder: w.sortOrder,
      })
      .returning({ id: works.id });

    if (w.links.length > 0) {
      await db.insert(workLinks).values(
        w.links.map((l) => ({
          workId: work.id,
          label: l.label,
          url: l.url,
          sortOrder: l.sortOrder,
        })),
      );
    }

    if (w.screenshots.length > 0) {
      await db.insert(workScreenshots).values(
        w.screenshots.map((s) => ({
          workId: work.id,
          imageUrl: s.imageUrl,
          sortOrder: s.sortOrder,
        })),
      );
    }

    const tagIds = w.tagNames
      .map((name) => tagByName.get(name))
      .filter((id): id is string => id !== undefined);

    if (tagIds.length > 0) {
      await db
        .insert(workTags)
        .values(tagIds.map((tagId) => ({ workId: work.id, tagId })));
    }
  }
  console.log(`  ✓ ${SEED_WORKS.length} works`);

  console.log("🎉 Demo data seeded successfully");
}
