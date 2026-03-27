import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { table } from "./schema";
import { spreads } from "./utils";

const _insertUser = createInsertSchema(table.users, {
  email: t.String({ format: "email" }),
});

const _selectUser = createSelectSchema(table.users, {
  email: t.String({ format: "email" }),
});

const _insertSkill = createInsertSchema(table.skills, {
  imageUrl: t.String({ format: "uri" }),
});

const _selectSkill = createSelectSchema(table.skills, {
  imageUrl: t.String({ format: "uri" }),
});

const _insertSkillDetail = createInsertSchema(table.skillDetails);
const _selectSkillDetail = createSelectSchema(table.skillDetails);

const _insertExperience = createInsertSchema(table.experiences, {
  companyLogoUrl: t.String({ format: "uri" }),
});

const _selectExperience = createSelectSchema(table.experiences, {
  companyLogoUrl: t.String({ format: "uri" }),
});

const _insertExperienceAchievement = createInsertSchema(
  table.experienceAchievements
);
const _selectExperienceAchievement = createSelectSchema(
  table.experienceAchievements
);

export const dbModel = {
  insert: spreads({
    users: _insertUser,
    skills: _insertSkill,
    skillDetails: _insertSkillDetail,
    experiences: _insertExperience,
    experienceAchievements: _insertExperienceAchievement,
  }),
  select: spreads({
    users: _selectUser,
    skills: _selectSkill,
    skillDetails: _selectSkillDetail,
    experiences: _selectExperience,
    experienceAchievements: _selectExperienceAchievement,
  }),
} as const;
