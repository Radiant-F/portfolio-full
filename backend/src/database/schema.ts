import {
  pgTable,
  varchar,
  timestamp,
  integer,
  text,
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

export const table = {
  users,
  skills,
  skillDetails,
  experiences,
  experienceAchievements,
} as const;
export type Table = typeof table;
