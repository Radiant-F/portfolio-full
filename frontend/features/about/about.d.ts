export type AboutResponse = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type AboutRequest = {
  content: string;
};
