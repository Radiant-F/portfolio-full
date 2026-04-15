import { apiSlice } from "@/api/apiSlice";
import { CreateContact, ResponseContact, UpdateContact } from "../contact";

const contactApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getContact: builder.query<ResponseContact[], null>({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    createContact: builder.mutation<ResponseContact, CreateContact>({
      query: (form) => ({
        url: "/contacts",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateContact: builder.mutation<
      ResponseContact,
      { id: string; body: UpdateContact }
    >({
      query: ({ id, body }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;
