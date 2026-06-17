import { LocaleType } from "@/constants/language";

export type Achievement = {
  id: string;
  experienceId: string;
  description: string;
  descriptionI18n: Record<string, string>;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ExperienceResponse = {
  id: string;
  companyTitle: string;
  companyLogoUrl: string;
  startDate: string;
  endDate: string | null;
  position: string;
  responsibility: string;
  responsibilityI18n: Record<string, string>;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  achievements: Achievement[];
};

export type UpdateExperienceTranslation = {
  lang: LocaleType;
  responsibility: string;
};

export type UpdateAchievementTranslation = {
  lang: LocaleType;
  description: string;
};

export type CreateAchievement = {
  description: string;
  sortOrder?: number;
};

export type UpdateAchievement = {
  description?: string;
  sortOrder?: number;
};
