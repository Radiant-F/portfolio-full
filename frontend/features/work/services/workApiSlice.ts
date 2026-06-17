import { apiSlice } from "@/api/apiSlice";
import {
  AttachWorkTag,
  CreateWorkLink,
  UpdateWorkLink,
  UpdateWorkTranslation,
  WorkLink,
  WorkResponse,
  WorkScreenshot,
  WorkTag,
} from "../work";

const workApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWorks: builder.query<WorkResponse[], null>({
      query: () => "/works",
      providesTags: ["Works"],
    }),
    getWork: builder.query<WorkResponse, string>({
      query: (id) => `/works/${id}`,
      providesTags: ["Works"],
    }),
    getWorkScreenshotPreview: builder.query<WorkScreenshot[], null>({
      query: () => "/works/screenshots/preview",
    }),
    createWork: builder.mutation<WorkResponse, FormData>({
      query: (formData) => ({
        url: "/works",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Works"],
    }),
    updateWork: builder.mutation<WorkResponse, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/works/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Works"],
    }),
    deleteWork: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/works/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Works"],
    }),
    createWorkLink: builder.mutation<
      WorkLink,
      { workId: string; body: CreateWorkLink }
    >({
      query: ({ workId, body }) => ({
        url: `/works/${workId}/links`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Works"],
    }),
    updateWorkLink: builder.mutation<
      WorkLink,
      { workId: string; linkId: string; body: UpdateWorkLink }
    >({
      query: ({ workId, linkId, body }) => ({
        url: `/works/${workId}/links/${linkId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Works"],
    }),
    deleteWorkLink: builder.mutation<
      { message: string },
      { workId: string; linkId: string }
    >({
      query: ({ workId, linkId }) => ({
        url: `/works/${workId}/links/${linkId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Works"],
    }),
    createWorkScreenshot: builder.mutation<
      WorkScreenshot,
      { workId: string; body: FormData }
    >({
      query: ({ workId, body }) => ({
        url: `/works/${workId}/screenshots`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Works"],
    }),
    deleteWorkScreenshot: builder.mutation<
      { message: string },
      { workId: string; screenshotId: string }
    >({
      query: ({ workId, screenshotId }) => ({
        url: `/works/${workId}/screenshots/${screenshotId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Works"],
    }),
    attachWorkTag: builder.mutation<
      WorkTag,
      { workId: string; body: AttachWorkTag }
    >({
      query: ({ workId, body }) => ({
        url: `/works/${workId}/tags`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Works"],
    }),
    detachWorkTag: builder.mutation<
      { message: string },
      { workId: string; tagId: string }
    >({
      query: ({ workId, tagId }) => ({
        url: `/works/${workId}/tags/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Works"],
    }),
    updateWorkTranslation: builder.mutation<
      WorkResponse,
      { workId: string; body: UpdateWorkTranslation }
    >({
      query: ({ workId, body }) => ({
        url: `/works/${workId}/translations`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Works"],
    }),
  }),
});

export const {
  useGetWorksQuery,
  useGetWorkQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
  useCreateWorkLinkMutation,
  useUpdateWorkLinkMutation,
  useDeleteWorkLinkMutation,
  useCreateWorkScreenshotMutation,
  useDeleteWorkScreenshotMutation,
  useAttachWorkTagMutation,
  useDetachWorkTagMutation,
  useUpdateWorkTranslationMutation,
  useGetWorkScreenshotPreviewQuery,
} = workApiSlice;
