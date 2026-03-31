import {
  pgTable,
  varchar,
  timestamp,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const skills = pgTable("skills", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const skillDetails = pgTable("skill_details", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  skillId: varchar("skill_id")
    .notNull()
    .references(() => skills.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const skillsRelations = relations(skills, ({ many }) => ({
  details: many(skillDetails),
}));

export const skillDetailsRelations = relations(skillDetails, ({ one }) => ({
  skill: one(skills, {
    fields: [skillDetails.skillId],
    references: [skills.id],
  }),
}));

export const experiences = pgTable("experiences", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  companyTitle: varchar("company_title", { length: 255 }).notNull(),
  companyLogoUrl: varchar("company_logo_url", { length: 512 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  position: varchar("position", { length: 255 }).notNull(),
  responsibility: text("responsibility").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const experienceAchievements = pgTable("experience_achievements", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  experienceId: varchar("experience_id")
    .notNull()
    .references(() => experiences.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const experiencesRelations = relations(experiences, ({ many }) => ({
  achievements: many(experienceAchievements),
}));

export const experienceAchievementsRelations = relations(
  experienceAchievements,
  ({ one }) => ({
    experience: one(experiences, {
      fields: [experienceAchievements.experienceId],
      references: [experiences.id],
    }),
  })
);

// ─── Tags ──────────────────────────────────────────────────

export const tags = pgTable("tags", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ─── Works ─────────────────────────────────────────────────

export const works = pgTable("works", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  iconUrl: varchar("icon_url", { length: 512 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workLinks = pgTable("work_links", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  workId: varchar("work_id")
    .notNull()
    .references(() => works.id, { onDelete: "cascade" }),
  label: varchar("label", { length: 100 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workScreenshots = pgTable("work_screenshots", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  workId: varchar("work_id")
    .notNull()
    .references(() => works.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const workTags = pgTable(
  "work_tags",
  {
    workId: varchar("work_id")
      .notNull()
      .references(() => works.id, { onDelete: "cascade" }),
    tagId: varchar("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.workId, table.tagId] })]
);

// ─── Work Relations ────────────────────────────────────────

export const worksRelations = relations(works, ({ many }) => ({
  links: many(workLinks),
  screenshots: many(workScreenshots),
  workTags: many(workTags),
}));

export const workLinksRelations = relations(workLinks, ({ one }) => ({
  work: one(works, {
    fields: [workLinks.workId],
    references: [works.id],
  }),
}));

export const workScreenshotsRelations = relations(
  workScreenshots,
  ({ one }) => ({
    work: one(works, {
      fields: [workScreenshots.workId],
      references: [works.id],
    }),
  })
);

export const workTagsRelations = relations(workTags, ({ one }) => ({
  work: one(works, {
    fields: [workTags.workId],
    references: [works.id],
  }),
  tag: one(tags, {
    fields: [workTags.tagId],
    references: [tags.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  workTags: many(workTags),
}));

// ─── Contacts ──────────────────────────────────────────────

export const contacts = pgTable("contacts", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ─── About ─────────────────────────────────────────────────

export const about = pgTable("about", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const table = {
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
  about,
} as const;
export type Table = typeof table;
