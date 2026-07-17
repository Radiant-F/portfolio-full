import { apiSlice } from "@/api/apiSlice";
import { AboutResponse, CreateAbout, UpdateAbout } from "../about";

const aboutApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAbout: build.query<AboutResponse[], null>({
      query: () => "/about",
      providesTags: ["About"],
    }),
    createAbout: build.mutation<AboutResponse, CreateAbout>({
      query: (body) => ({
        url: "/about",
        method: "POST",
        body,
      }),
      invalidatesTags: ["About"],
    }),
    updateAbout: build.mutation<
      AboutResponse,
      { id: string; body: UpdateAbout }
    >({
      query: ({ id, body }) => ({
        url: `/about/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["About"],
    }),
    deleteAbout: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/about/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
} = aboutApiSlice;
