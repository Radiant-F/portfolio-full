export type WorkLink = {
  id: string;
  workId: string;
  label: string;
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
  name: string;
};

export type WorkResponse = {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  links: WorkLink[];
  screenshots: WorkScreenshot[];
  tags: WorkTag[];
};

export type CreateWorkLink = {
  label: string;
  url: string;
  sortOrder?: number;
};

export type UpdateWorkLink = {
  label?: string;
  url?: string;
  sortOrder?: number;
};

export type AttachWorkTag = {
  tagId: string;
};
