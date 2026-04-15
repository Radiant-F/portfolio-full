export type Achievement = {
  id: string;
  experienceId: string;
  description: string;
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
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  achievements: Achievement[];
};

export type CreateAchievement = {
  description: string;
  sortOrder?: number;
};

export type UpdateAchievement = {
  description?: string;
  sortOrder?: number;
};
