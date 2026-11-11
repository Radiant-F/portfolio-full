import type { LoginResponse } from "@/features/auth/auth";
import {
  clearCredentials,
  setCredentials,
} from "@/features/auth/services/authReducerSlice";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL_PROD,
  credentials: Platform.OS === "web" ? "include" : "omit",
  prepareHeaders: (headers, api) => {
    const accessToken = (api.getState() as RootState).auth.credentials
      .accessToken;

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["About", "Contacts", "Skills", "Experiences", "Tags", "Works"],
});
