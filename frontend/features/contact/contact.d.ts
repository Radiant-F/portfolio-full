export type ResponseContact = {
  id: string;
  platform: string;
  title: string;
  url: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateContact = {
  platform: string;
  title: string;
  url: string;
  sortOrder: number;
};

export type UpdateContact = {
  platform?: string;
  title?: string;
  url?: string;
  sortOrder?: number;
};
