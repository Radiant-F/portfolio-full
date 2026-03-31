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

const _insertTag = createInsertSchema(table.tags);
const _selectTag = createSelectSchema(table.tags);

const _insertWork = createInsertSchema(table.works, {
  iconUrl: t.String({ format: "uri" }),
});
const _selectWork = createSelectSchema(table.works, {
  iconUrl: t.String({ format: "uri" }),
});

const _insertWorkLink = createInsertSchema(table.workLinks, {
  url: t.String({ format: "uri" }),
});
const _selectWorkLink = createSelectSchema(table.workLinks, {
  url: t.String({ format: "uri" }),
});

const _insertWorkScreenshot = createInsertSchema(table.workScreenshots, {
  imageUrl: t.String({ format: "uri" }),
});
const _selectWorkScreenshot = createSelectSchema(table.workScreenshots, {
  imageUrl: t.String({ format: "uri" }),
});

const _insertWorkTag = createInsertSchema(table.workTags);
const _selectWorkTag = createSelectSchema(table.workTags);

export const dbModel = {
  insert: spreads({
    users: _insertUser,
    skills: _insertSkill,
    skillDetails: _insertSkillDetail,
    experiences: _insertExperience,
    experienceAchievements: _insertExperienceAchievement,
    tags: _insertTag,
    works: _insertWork,
    workLinks: _insertWorkLink,
    workScreenshots: _insertWorkScreenshot,
    workTags: _insertWorkTag,
  }),
  select: spreads({
    users: _selectUser,
    skills: _selectSkill,
    skillDetails: _selectSkillDetail,
    experiences: _selectExperience,
    experienceAchievements: _selectExperienceAchievement,
    tags: _selectTag,
    works: _selectWork,
    workLinks: _selectWorkLink,
    workScreenshots: _selectWorkScreenshot,
    workTags: _selectWorkTag,
  }),
} as const;
