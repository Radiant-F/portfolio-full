export type TagResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTag = {
  name: string;
};

export type UpdateTag = {
  name?: string;
};
