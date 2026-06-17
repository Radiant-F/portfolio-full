export type SkillDetail = {
  id: string;
  skillId: string;
  name: string;
  description: string;
  descriptionI18n: Record<string, string>;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateSkillDetailTranslation = {
  lang: "ar" | "id" | "cn" | "jp" | "ru";
  description: string;
};

export type SkillResponse = {
  id: string;
  title: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  details: SkillDetail[];
};

export type CreateSkillDetail = {
  name: string;
  description: string;
  sortOrder?: number;
};

export type UpdateSkillDetail = {
  name?: string;
  description?: string;
  sortOrder?: number;
};
