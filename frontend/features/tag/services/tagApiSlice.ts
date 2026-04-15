import { apiSlice } from "@/api/apiSlice";
import { CreateTag, TagResponse, UpdateTag } from "../tag";

const tagApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTags: builder.query<TagResponse[], null>({
      query: () => "/tags",
      providesTags: ["Tags"],
    }),
    createTag: builder.mutation<TagResponse, CreateTag>({
      query: (body) => ({
        url: "/tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tags"],
    }),
    updateTag: builder.mutation<TagResponse, { id: string; body: UpdateTag }>({
      query: ({ id, body }) => ({
        url: `/tags/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tags"],
    }),
    deleteTag: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags", "Works"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApiSlice;
