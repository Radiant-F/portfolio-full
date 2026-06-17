import { apiSlice } from "@/api/apiSlice";
import {
  Achievement,
  CreateAchievement,
  ExperienceResponse,
  UpdateAchievement,
  UpdateAchievementTranslation,
  UpdateExperienceTranslation,
} from "../experience";

const experienceApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getExperiences: builder.query<ExperienceResponse[], null>({
      query: () => "/experiences",
      providesTags: ["Experiences"],
    }),
    getExperience: builder.query<ExperienceResponse, string>({
      query: (id) => `/experiences/${id}`,
      providesTags: ["Experiences"],
    }),
    createExperience: builder.mutation<ExperienceResponse, FormData>({
      query: (formData) => ({
        url: "/experiences",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateExperience: builder.mutation<
      ExperienceResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
    }),
    createAchievement: builder.mutation<
      Achievement,
      { experienceId: string; body: CreateAchievement }
    >({
      query: ({ experienceId, body }) => ({
        url: `/experiences/${experienceId}/achievements`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateAchievement: builder.mutation<
      Achievement,
      { experienceId: string; achievementId: string; body: UpdateAchievement }
    >({
      query: ({ experienceId, achievementId, body }) => ({
        url: `/experiences/${experienceId}/achievements/${achievementId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteAchievement: builder.mutation<
      { message: string },
      { experienceId: string; achievementId: string }
    >({
      query: ({ experienceId, achievementId }) => ({
        url: `/experiences/${experienceId}/achievements/${achievementId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateExperienceTranslation: builder.mutation<
      ExperienceResponse,
      { experienceId: string; body: UpdateExperienceTranslation }
    >({
      query: ({ experienceId, body }) => ({
        url: `/experiences/${experienceId}/translations`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateAchievementTranslation: builder.mutation<
      Achievement,
      {
        experienceId: string;
        achievementId: string;
        body: UpdateAchievementTranslation;
      }
    >({
      query: ({ experienceId, achievementId, body }) => ({
        url: `/experiences/${experienceId}/achievements/${achievementId}/translations`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useUpdateExperienceTranslationMutation,
  useUpdateAchievementTranslationMutation,
} = experienceApiSlice;
