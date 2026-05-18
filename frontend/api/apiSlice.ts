import { setCredentials } from "@/features/auth/services/authReducerSlice";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";
import { Platform } from "react-native";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.20.121:3000",
  prepareHeaders: (headers, api) => {
    const accessToken = (api.getState() as RootState).auth.credentials
      .accessToken;

    // Web platform uses cookie but mobile isn't
    if (accessToken && Platform.OS !== "web")
      headers.set("Authorization", `Bearer ${accessToken}`);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);

  if (result.error && result.error.status === 401) {
    const refreshToken = storage.getString("token.refresh");
    if (!refreshToken) return result;

    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", body: { refreshToken } },
      api,
      extra,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      storage.set("token.access", data.accessToken);
      storage.set("token.refresh", data.refreshToken);

      api.dispatch(
        setCredentials({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: null,
        }),
      );

      result = await baseQuery(args, api, extra);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["About", "Contacts", "Skills", "Experiences", "Tags", "Works"],
});
