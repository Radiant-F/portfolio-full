import { apiSlice } from "@/api/apiSlice";
import { AboutRequest, AboutResponse } from "../about";

const aboutApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAbout: build.query<AboutResponse, null>({
      query: () => "/about",
      providesTags: ["About"],
    }),
    updateAbout: build.mutation<AboutResponse, AboutRequest>({
      query: (content) => ({
        url: "/about",
        method: "PUT",
        body: content,
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation } = aboutApiSlice;
