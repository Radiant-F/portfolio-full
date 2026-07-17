import { LocaleType } from "@/constants/language";

export type AboutResponse = {
  id: string;
  title: string;
  content: string;
  titleI18n: Record<string, string>;
  contentI18n: Record<string, string>;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateAbout = {
  title: string;
  content: string;
  titleI18n?: Partial<Record<LocaleType, string>>;
  contentI18n?: Partial<Record<LocaleType, string>>;
  sortOrder?: number;
};

export type UpdateAbout = {
  title?: string;
  content?: string;
  titleI18n?: Partial<Record<LocaleType, string>>;
  contentI18n?: Partial<Record<LocaleType, string>>;
  sortOrder?: number;
};
