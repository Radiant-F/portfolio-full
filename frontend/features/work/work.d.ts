import { WorkTagName, WorkPlatformName } from "@/constants/twork-tag";

export type WorkLink = {
  id: string;
  workId: string;
  label: string;
  platform: WorkPlatformName;
  url: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type WorkScreenshot = {
  id: string;
  workId: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type WorkTag = {
  id: string;
  name: WorkTagName;
};

export type WorkResponse = {
  id: string;
  title: string;
  description: string;
  descriptionI18n: Record<string, string>;
  iconUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  links: WorkLink[];
  screenshots: WorkScreenshot[];
  tags: WorkTag[];
};

export type UpdateWorkTranslation = {
  lang: "ar" | "id" | "cn" | "jp" | "ru";
  description: string;
};

export type CreateWorkLink = {
  label: string;
  platform: WorkPlatformName;
  url: string;
  sortOrder?: number;
};

export type UpdateWorkLink = {
  label?: string;
  platform?: WorkPlatformName;
  url?: string;
  sortOrder?: number;
};

export type AttachWorkTag = {
  tagId: string;
};
