import { apiSlice } from "@/api/apiSlice";
import {
  CreateSkillDetail,
  SkillDetail,
  SkillResponse,
  UpdateSkillDetail,
} from "../skill";

const skillApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSkills: builder.query<SkillResponse[], null>({
      query: () => "/skills",
      providesTags: ["Skills"],
    }),
    getSkill: builder.query<SkillResponse, string>({
      query: (id) => `/skills/${id}`,
      providesTags: ["Skills"],
    }),
    createSkill: builder.mutation<SkillResponse, FormData>({
      query: (formData) => ({
        url: "/skills",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkill: builder.mutation<
      SkillResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
    createSkillDetail: builder.mutation<
      SkillDetail,
      { skillId: string; body: CreateSkillDetail }
    >({
      query: ({ skillId, body }) => ({
        url: `/skills/${skillId}/details`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkillDetail: builder.mutation<
      SkillDetail,
      { skillId: string; detailId: string; body: UpdateSkillDetail }
    >({
      query: ({ skillId, detailId, body }) => ({
        url: `/skills/${skillId}/details/${detailId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkillDetail: builder.mutation<
      { message: string },
      { skillId: string; detailId: string }
    >({
      query: ({ skillId, detailId }) => ({
        url: `/skills/${skillId}/details/${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useCreateSkillDetailMutation,
  useUpdateSkillDetailMutation,
  useDeleteSkillDetailMutation,
} = skillApiSlice;
